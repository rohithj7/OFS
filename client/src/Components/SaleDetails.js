import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function SaleDetails() {
  const { id } = useParams();
  const [saleDetails, setSaleDetails] = useState(null);

  useEffect(() => {
    const fetchSaleDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/sales/${id}`, {
          withCredentials: true,
        });
        setSaleDetails(response.data);
      } catch (error) {
        console.error("Error fetching sale details:", error);
        alert("Failed to fetch sale details");
      }
    };

    fetchSaleDetails();
  }, [id]);

  if (!saleDetails) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 mb-5">
          <div className="card border border-2">
            <div className="card-header bg-white p-4 d-flex justify-content-between align-items-center">
              <h3 className="fs-4 mb-0">Sale Details #{saleDetails.saleId}</h3>
            </div>

            <div className="card-body p-4">
              {/* Customer Information */}
              <div className="mb-5">
                <h4 className="mb-4">Customer Information</h4>
                <div className="mb-3">
                  <strong>Customer ID:</strong> {saleDetails.customerId}
                </div>
                <div className="mb-3">
                  <strong>Customer Name:</strong>{" "}
                  {saleDetails.customerFirstName} {saleDetails.customerLastName}
                </div>
                <div className="mb-3">
                  <strong>Customer Phone:</strong> {saleDetails.customerPhone}
                </div>
                <div className="mb-3">
                  <strong>Shipping Address:</strong>{" "}
                  {saleDetails.customerAddress}
                </div>
              </div>

              {/* Order Information */}
              <div className="mb-5">
                <h4 className="mb-4">Order Information</h4>
                <div className="mb-3">
                  <strong>Order Date:</strong>{" "}
                  {new Date(saleDetails.saleDate).toLocaleDateString()}
                </div>
                <div className="mb-3">
                  <strong>Payment Details:</strong> {saleDetails.paymentDetails}
                </div>
                <div className="mb-3">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge ${
                      saleDetails.saleStatus === "COMPLETED"
                        ? "bg-success"
                        : saleDetails.saleStatus === "ONGOING"
                        ? "bg-mint"
                        : "bg-warning"
                    }`}
                  >
                    {saleDetails.saleStatus}
                  </span>
                </div>
              </div>

              {/* Products Information */}
              <div>
                <div className="table-responsive">
                  <table className="table text-nowrap table-centered">
                    <thead>
                      <tr>
                        <th className="text-center">Product (ID)</th>
                        <th className="text-center">Price Per Unit</th>
                        <th className="text-center">Weight Per Unit</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Total Weight</th>
                        <th className="text-center">Total Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {saleDetails.products.map((product) => (
                        <tr key={product.productId}>
                          <td className="align-middle">
                            <div className="d-flex align-items-center">
                              {product.pictureUrl && (
                                <img
                                  src={`${product.pictureUrl}`}
                                  alt={product.productName}
                                  className="me-3"
                                  style={{
                                    width: "80px",
                                    height: "80px",
                                    objectFit: "cover",
                                  }}
                                />
                              )}
                              <h6 className="mb-0 me-1">{product.productName}</h6>
                              <span className="text-muted">
                                (ID: {product.productId})
                              </span>
                            </div>
                          </td>
                          <td className="align-middle text-center">
                            ${Number(product.price).toFixed(2)}
                          </td>
                          <td className="align-middle text-center">
                            {product.weight !== "N/A"
                              ? product.weight >= 16
                                ? `${(product.weight / 16).toFixed(2)} lbs`
                                : `${product.weight} oz`
                              : "N/A"}
                          </td>
                          <td className="align-middle text-center">
                            {product.quantity}
                          </td>
                          <td className="align-middle text-center">
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
                          </td>
                          <td className="align-middle text-center">
                            ${(product.quantity * product.price).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Total Amount Footer */}
                <div className="d-flex align-items-center justify-content-end mb-3">
                  <div>Delivery Fee:</div>
                  <div className="fw-bold ms-2">
                    ${parseFloat(saleDetails.deliveryFee || 0).toFixed(2)}
                  </div>
                </div>
                <div className="card-footer border-0 px-4 py-4 mt-2 bg-white">
                  <h5 className="d-flex align-items-center justify-content-end text-black mb-0">
                    Total paid:{" "}
                    <span className="h2 mb-0 ms-2">
                      ${parseFloat(saleDetails.totalPrice).toFixed(2)}
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaleDetails;
