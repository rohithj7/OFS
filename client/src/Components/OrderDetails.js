import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

function OrderDetails() {
  const { id } = useParams();
  const routerLocation = useLocation();
  const { orderDate, orderStatus } = routerLocation.state || {};
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingAddress, setShippingAddress] = useState("Loading...");
  const [customerInfo, setCustomerInfo] = useState({
    id: "",
    firstName: "",
    lastName: "",
  });
  const [saleProducts, setSaleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const renderOrderStatus = (status) => {
    switch (status) {
      case "NOT STARTED":
        return "Pending";
      case "ONGOING":
        return "Shipped";
      case "COMPLETED":
        return "Delivered";
      default:
        return status;
    }
  };

  const [deliveryFee, setDeliveryFee] = useState(0);
  useEffect(() => {
    const fetchSaleDetails = async () => {
      try {
        // Fetch sale details directly from the `/sales` endpoint
        const response = await axios.get("http://localhost:8080/sales", {
          withCredentials: true,
        });

        // Find the sale with the specific sale ID
        const sale = response.data.find((sale) => sale.saleId === parseInt(id));
        if (sale) {
          setSaleProducts(
            sale.products.map((product) => ({
              ...product,
            }))
          );
          setTotalPrice(sale.totalPrice);
          setDeliveryFee(sale.deliveryFee || 0);
        } else {
          setError("Sale not found.");
        }
      } catch (err) {
        console.error("Error fetching sale details:", err);
        setError("Failed to fetch sale details.");
      } finally {
        setLoading(false);
      }
    };

    const fetchShippingAddress = async () => {
      try {
        const response = await axios.get("http://localhost:8080/customerinfo", {
          withCredentials: true,
        });
        setShippingAddress(response.data.ADDRESS || "Address not available");
        setCustomerInfo({
          id: response.data.ID || "N/A",
          firstName: response.data.FIRSTNAME || "N/A",
          lastName: response.data.LASTNAME || "N/A",
        });
      } catch (err) {
        console.error("Error fetching shipping address:", err);
        setShippingAddress("Could not retrieve address");
      }
    };

    fetchSaleDetails();
    fetchShippingAddress();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div class="row d-flex justify-content-center mt-4">
        <div class="col-lg-10 col-xl-9">
          <div class="card m-2 border-2">
            <div class="card-header px-3 pt-4 border-0 bg-light">
              <p class="fs-3 mb-4 text-center">Order Details</p>

              <div class="container text-center">
                <div class="row row-cols-6">
                  <div class="col border-end">
                    <p class="fw-bold text-secondary mb-1">Sale ID</p>
                    <p>{id}</p>
                  </div>
                  <div class="col border-end">
                    <p class="fw-bold text-secondary mb-1">Customer ID</p>
                    <p>{customerInfo.id}</p>
                  </div>
                  <div class="col border-end">
                    <p class="fw-bold text-secondary mb-1">Customer Name</p>
                    <p>
                      {customerInfo.firstName} {customerInfo.lastName}
                    </p>
                  </div>
                  <div class="col border-end">
                    <p class="fw-bold text-secondary mb-1">Order Date</p>
                    <p>
                      {new Date(orderDate).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div class="col border-end">
                    <p class="fw-bold text-secondary mb-1">Shipping Address</p>
                    <p class="small">{shippingAddress}</p>
                  </div>
                  <div class="col">
                    <p class="fw-bold text-secondary mb-1">Order Status</p>
                    <p>{renderOrderStatus(orderStatus)}</p>
                  </div>
                </div>
              </div>

              {/* <div class="mt-4 border-bottom border-3">
              </div> */}
            </div>
            <div class="card-body p-4">
              <p class="lead fw-semibold mb-4 text-center">Receipt</p>

              <div class="table-responsive-xxl border-0">
                {saleProducts.length > 0 ? (
                  <table
                    id="ordersTable"
                    class="text-nowrap table-centered mt-0 table"
                    style={{ width: "100%" }}
                  >
                    <thead class="">
                      <tr>
                        <th colspan="1">
                          <div class=""></div>
                        </th>
                        <th colspan="1">
                          <div class="text-secondary text-center">Product</div>
                        </th>
                        <th colspan="1">
                          <div class="text-secondary text-center">
                            Price Per Unit
                          </div>
                        </th>
                        <th colspan="1">
                          <div class="text-secondary text-center">
                            Weight Per Unit
                          </div>
                        </th>
                        <th colspan="1">
                          <div class="text-secondary text-center">Quantity</div>
                        </th>
                        <th colspan="1">
                          <div class="text-secondary text-center">
                            Total Weight
                          </div>
                        </th>
                        <th colspan="1">
                          <div class="text-secondary text-center">
                            Total Price
                          </div>
                        </th>
                        <th colspan="1">
                          <div class=""></div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {saleProducts.map((product, index) => (
                        <tr key={product.productId}>
                          <td class="align-middle border-top-0 text-center">
                            <img
                              src={`${product.pictureUrl}`}
                              alt={`Product ${product.productName}`}
                              class="img-fluid"
                              style={{
                                width: "120px",
                                height: "auto",
                                marginRight: "10px",
                              }}
                            ></img>
                          </td>
                          <td class="align-middle border-top-0">
                            <a class="text-decoration-none text-black text-center">
                              <h6 class="mb-0">{product.productName}</h6>
                            </a>
                          </td>
                          <td class="align-middle border-top-0">
                            <a class="text-decoration-none text-black text-center">
                              <h6 class="mb-0">
                                ${Number(product.price).toFixed(2)}
                              </h6>
                            </a>
                          </td>
                          <td class="align-middle border-top-0">
                            <a class="text-decoration-none text-black text-center">
                              <h6 class="mb-0">
                                {product.weight !== "N/A"
                                  ? product.weight >= 16
                                    ? `${(product.weight / 16).toFixed(2)} lbs`
                                    : `${product.weight} oz`
                                  : "N/A"}
                              </h6>
                            </a>
                          </td>
                          <td class="align-middle border-top-0">
                            <a class="text-decoration-none text-black text-center">
                              <h6 class="mb-0">{product.quantity}</h6>
                            </a>
                          </td>
                          <td class="align-middle border-top-0">
                            <a class="text-decoration-none text-black text-center">
                              <h6 class="mb-0">
                                {product.weight !== "N/A"
                                  ? product.quantity * product.weight >= 16
                                    ? `${(
                                        (product.quantity * product.weight) /
                                        16
                                      ).toFixed(2)} lbs`
                                    : `${(
                                        product.quantity * product.weight
                                      ).toFixed(2)} oz`
                                  : "N/A"}
                              </h6>
                            </a>
                          </td>
                          <td class="align-middle border-top-0">
                            <a class="text-decoration-none text-black text-center">
                              <h6 class="mb-0">
                                ${(product.quantity * product.price).toFixed(2)}
                              </h6>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No products found for this sale.</p>
                )}

                <div class="card-footer border-0 px-4 py-4 mt-2 bg-white">
                  <p className="text-end text-muted mb-2">
                    Delivery Fee: ${Number(deliveryFee).toFixed(2)}
                  </p>
                  <h5 class="d-flex align-items-center justify-content-end text-black mb-0 me-2">
                    Total paid:{" "}
                    <span class="h2 mb-0 ms-2">
                      ${Number(totalPrice).toFixed(2)}
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
