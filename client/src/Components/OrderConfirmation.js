import React from "react";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="mt-5 card p-5 border border-2">
              <div className="card-body p-5 my-5">
                <div className="mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    fill="currentColor"
                    className="bi bi-check-circle-fill text-green"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>
                </div>
                <h1 className="display-5 mb-4">Order Placed Successfully!</h1>
                <p className="lead mb-4">
                  Thank you for your purchase. Your order has been confirmed.
                </p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                  <Link
                    to="/Orders"
                    className="btn border-2 px-4 me-sm-3 viewMyOrdersButton"
                  >
                    View My Orders
                  </Link>
                  <Link to="/Home" className="btn border-2 continueShoppingButton px-4">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
