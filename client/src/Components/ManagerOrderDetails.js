import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";

function ManagerOrderDetails() {
  const { id } = useParams();
  const [saleDetails, setSaleDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSaleDetails = async () => {
      try {
        const response = await axios.get("http://localhost:8080/all_sales", {
          withCredentials: true,
        });

        const sale = response.data.find((sale) => sale.ID === parseInt(id));

        if (sale) {
          setSaleDetails(sale);
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

    fetchSaleDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Order Details</h2>
          </div>

          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Sale ID</th>
                  <th>Customer ID</th>
                  <th>Sale Date</th>
                  <th>Payment Details</th>
                  <th>Status</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{saleDetails?.ID}</td>
                  <td>{saleDetails?.CUSTOMERID}</td>
                  <td>
                    {new Date(saleDetails?.SALEDATE).toLocaleDateString()}
                  </td>
                  <td>{saleDetails?.PAYMENTDETAILS || "N/A"}</td>
                  <td>
                    <span
                      className={`badge ${
                        saleDetails?.SALE_STATUS === "COMPLETED"
                          ? "bg-success"
                          : saleDetails?.SALE_STATUS === "ONGOING"
                          ? "bg-mint"
                          : "bg-warning"
                      }`}
                    >
                      {saleDetails?.SALE_STATUS}
                    </span>
                  </td>
                  <td>${Number(saleDetails?.PRICE || 0).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <h4 className="mb-0">
              Total Amount:{" "}
              <span className="text-success">
                ${Number(saleDetails?.PRICE || 0).toFixed(2)}
              </span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerOrderDetails;
