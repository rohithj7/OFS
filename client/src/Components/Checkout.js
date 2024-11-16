import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import {
  useStripe,
  useElements,
  PaymentElement,
  CardElement,
} from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Load the publishable key from Stripe
const stripePromise = loadStripe(
  "pk_test_51QLGHpBI56iyGeVwohOAeqeUa0OQQmSpCjT6xI2tagJujZdyrOHUIOIuDhBPk8Rq49PJkVJtKiElywf3zHoUjM8b00D3adN1kQ"
);
console.log("Stripe promise initialized:", stripePromise);

// Create a wrapper component
const CheckoutWrapper = ({ cart, setCart, deliveryFee }) => {
  return (
    <Elements stripe={stripePromise}>
      <Checkout cart={cart} setCart={setCart} deliveryFee={deliveryFee} />
    </Elements>
  );
};

// Create a separate PaymentForm component
const PaymentForm = ({ cart, setCart, setError, clientSecret, error }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      setError("Payment system not initialized properly.");
      return;
    }

    setIsProcessing(true);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setError("Card information is required.");
        setIsProcessing(false);
        return;
      }

      console.log("Starting payment confirmation...");

      const { error: paymentError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              // can add billing details here if needed
            },
          },
        });

      console.log("Payment response:", { paymentError, paymentIntent });

      if (paymentError) {
        console.error("Payment error:", paymentError);
        setError(
          paymentError.message ||
            "Payment failed. Please check your card details and try again."
        );
        return;
      }

      if (paymentIntent.status === "succeeded") {
        console.log("Payment succeeded:", paymentIntent);

        // Add sale creation after successful payment
        try {
          const products = cart.map((item) => ({
            productId: item.ID,
            quantity: item.quantity,
          }));

          const saleResponse = await axios.post(
            "http://localhost:8080/place-sale",
            {
              products,
              paymentIntentId: paymentIntent.id,
            },
            { withCredentials: true }
          );

          if (saleResponse.status === 200) {
            setCart([]); // Clear cart after successful sale
            navigate("/Order-confirmation");
            alert("Payment successful! Your order has been placed.");
          } else {
            throw new Error("Failed to create sale record");
          }
        } catch (saleError) {
          console.error("Error creating sale:", saleError);
          setError(
            "Payment successful but order creation failed. Please contact support."
          );
        }
      } else {
        setError(`Payment status: ${paymentIntent.status}. Please try again.`);
      }
    } catch (err) {
      console.error("Caught error during payment:", err);
      setError(
        err.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="form-label fw-bold">Card Information</label>
        <div className="card p-3 bg-light">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                  padding: "10px 0",
                },
                invalid: {
                  color: "#9e2146",
                },
              },
              hidePostalCode: false,
              classes: {
                base: "form-control",
                focus: "is-focused",
                invalid: "is-invalid",
              },
              layout: {
                type: "tabs",
                defaultCollapsed: false,
                radios: true,
                spacedAccordionItems: false,
              },
            }}
          />
        </div>
        <div className="mt-2 small text-muted">
          <ul className="mb-0">
            <li>All card information is required</li>
            <li>For testing, use card number: 4242 4242 4242 4242</li>
            <li>Use any future date for expiration and any 3 digits for CVC</li>
          </ul>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger mt-2 mb-2">
          <small>{error}</small>
        </div>
      )}

      <button
        type="submit"
        className="btn btn-mint text-black w-100 mt-3"
        disabled={!stripe || isProcessing || !clientSecret}
      >
        {isProcessing ? (
          <span>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Processing...
          </span>
        ) : (
          "Pay Now"
        )}
      </button>
    </form>
  );
};

PaymentForm.propTypes = {
  clientSecret: PropTypes.string.isRequired,
  error: PropTypes.string,
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

// Main Checkout component
export default function Checkout({ cart = [], setCart, deliveryFee }) {
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    console.log("Stripe object:", stripe);
    console.log("Elements object:", elements);
    console.log("Cart received in Checkout:", cart);
  }, [cart, stripe, elements]);

  const [customerInfo, setCustomerInfo] = useState({
    id: "",
    firstName: "",
    lastName: "",
  });
  const [shippingAddress, setShippingAddress] = useState("Loading...");

  useEffect(() => {
    const fetchShippingAddress = async () => {
      try {
        const response = await axios.get("http://localhost:8080/customerinfo", {
          withCredentials: true,
        });
        setShippingAddress(response.data.ADDRESS);
        setCustomerInfo({
          id: response.data.ID || "N/A",
          firstName: response.data.FIRSTNAME || "",
          lastName: response.data.LASTNAME || "",
        });
      } catch (err) {
        console.error("Error fetching shipping address:", err);
        setError("Could not fetch shipping address.");
      }
    };

    fetchShippingAddress();
  }, []);

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (cart.length === 0) return;

      try {
        const totalPrice =
          cart.reduce((total, item) => total + item.PRICE * item.quantity, 0) +
          deliveryFee;

        console.log("Creating payment intent for amount:", totalPrice);

        const response = await axios.post(
          "http://localhost:8080/create-payment-intent",
          {
            amount: Math.round(totalPrice * 100), // In Stripe's implementation, the amount be cent to avoid issues with floating-point arithmetic
            currency: "usd",
          },
          { withCredentials: true }
        );

        console.log("Payment intent created:", response.data);
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.error("Error creating payment intent:", err);
        setError(
          err.response?.data?.message || "Failed to initialize payment system"
        );
      }
    };

    createPaymentIntent();
  }, [cart, deliveryFee]);

  return (
    <div>
      <section class="mb-lg-5 mb-5 mt-5">
        <div class="ms-xs-2 ms-sm-3 ms-md-3 ms-lg-4 ms-xl-5">
          <h1 class="ms-1 fw-bold mb-5">Checkout</h1>
        </div>

        <div>
          <div class="row">
            <div class="col-lg-6 col-md-12 ms-lg-3 ms-xl-5">
              <div
                id="accordionFlushExample"
                class="accordion accordion-flush border-box"
              >
                <div class="py-4 accordion-item">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      <div class="d-flex justify-content-between align-items-center">
                        <a class="fs-5 text-inherit h4" href="">
                          {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-2 text-muted">
                                                 <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                 <circle cx="12" cy="10" r="3"></circle>
                                             </svg> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            fill="currentColor"
                            class="bi bi-geo-alt me-1 text-secondary"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                          </svg>
                          Delivery address
                        </a>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    class="accordion-collapse collapse show"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                      <div class="mt-3 card">
                        <div class="p-3 card-body">
                          <p class="">
                            {customerInfo.firstName} {customerInfo.lastName}
                            <br />
                            {shippingAddress}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div class="py-4 accordion-item">
                             <h2 class="accordion-header">
                                 <button class="accordion-button collapsed bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                     <div class="d-flex justify-content-between align-items-center">
                                         <a class="fs-4 text-inherit h4 text-decoration-none" href="">
                                             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-pencil-square me-2 text-secondary" viewBox="0 0 16 16">
                                                 <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                 <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                             </svg>
                                             Additional Instructions
                                         </a>
                                     </div>
                                 </button>
                             </h2>
                             <div id="flush-collapseTwo" class="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                                 <div class="accordion-body">
                                     <div class="mt-3 card border-0">
                                         <div class="">
                                             <label class="form-label">Delivery instructions</label>
                                             <textarea rows="3" placeholder="Write delivery instructions " class="form-control"></textarea>
                                             <p class="form-text">Add instructions for how you want your order shopped and/or delivered</p>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div> */}
                <div class="py-4 accordion-item">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed bg-white"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseThree"
                      aria-expanded="false"
                      aria-controls="flush-collapseThree"
                    >
                      <div class="d-flex justify-content-between align-items-center">
                        <a
                          class="fs-4 text-inherit h4 text-decoration-none"
                          href=""
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            fill="currentColor"
                            class="bi bi-credit-card me-2 text-secondary"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                            <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                          </svg>
                          Payment
                        </a>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseThree"
                    class="accordion-collapse collapse show"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <PaymentForm
                        clientSecret={clientSecret}
                        error={error}
                        setError={setError}
                        cart={cart}
                        setCart={setCart}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-5 col-md-12 col-12 ms-lg-1">
              <div class="mt-4 mt-lg-0" style={{ mw: "390px" }}>
                <div class="shadow-sm card">
                  <h5 class="px-4 py-4 bg-transparent mb-0">Order Details</h5>
                  <ul class="list-group list-group-flush">
                    {cart.map((item) => (
                      <li key={item.ID} className="px-4 py-3 list-group-item">
                        <div className="align-items-center row">
                          <div className="col-md-2 col-2">
                            <img
                              src={`/Assets/${item.PICTURE_URL}`}
                              alt={item.PRODUCTNAME}
                              className="img-fluid"
                            />
                          </div>
                          <div className="col-md-5 col-5">
                            <h6 className="mb-0">{item.PRODUCTNAME}</h6>
                            <span>
                              <small className="text-muted">
                                {parseFloat(item.WEIGHT).toFixed(2)}oz.
                              </small>
                            </span>
                          </div>
                          <div className="text-center text-muted col-md-2 col-2">
                            <span>{item.quantity}</span>
                          </div>
                          <div className="text-lg-end text-start text-md-end col-md-3 col-3">
                            <span className="fw-bold">
                              ${(item.PRICE * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                    <li className="px-4 py-3 list-group-item">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div>Item Subtotal</div>
                        <div className="fw-bold">
                          $
                          {cart
                            .reduce(
                              (total, item) =>
                                total + item.PRICE * item.quantity,
                              0
                            )
                            .toFixed(2)}
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div>Total Weight</div>
                        <div className="fw-bold">
                          {(() => {
                            const totalWeight = cart.reduce(
                              (total, item) =>
                                total + item.WEIGHT * item.quantity,
                              0
                            );

                            if (totalWeight >= 16) {
                              const weightInLbs = (totalWeight / 16).toFixed(2);
                              return `${weightInLbs} lbs`;
                            } else {
                              return `${totalWeight.toFixed(2)} ounces`;
                            }
                          })()}
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div>Delivery Fee</div>
                        <div className="fw-bold">${deliveryFee.toFixed(2)}</div>
                      </div>
                    </li>
                    <li className="px-4 py-3 list-group-item">
                      <div className="d-flex align-items-center justify-content-between mb-2 fw-bold">
                        <div>Grand Total</div>
                        <div className="fw-bold">
                          $
                          {(
                            cart.reduce(
                              (total, item) =>
                                total + item.PRICE * item.quantity,
                              0
                            ) + deliveryFee
                          ).toFixed(2)}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
// Define PropTypes for the Checkout component
Checkout.propTypes = {
  clientSecret: PropTypes.string.isRequired,
  error: PropTypes.string,
  setError: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
  deliveryFee: PropTypes.number.isRequired,
};
