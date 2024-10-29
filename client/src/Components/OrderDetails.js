import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

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
        return "Completed";
      default:
        return status;
    }
  };

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
    <div>
      <div className="container text-left my-5">
        <h3 style={{ marginBottom: "40px" }}>Order Details</h3>
        <p>Order ID: {id}</p>
        <p>Customer ID: {customerInfo.id}</p>
        <p>
          Customer Name: {customerInfo.firstName} {customerInfo.lastName}
        </p>
        <p>Order Date: {orderDate}</p>
        <p>Shipping Address: {shippingAddress}</p>
        <p>Order Status: {renderOrderStatus(orderStatus)}</p>

        {saleProducts.length > 0 ? (
          <table style={{ width: "100%", marginTop: "20px" }}>
            <thead style={{ backgroundColor: "#f0f0f0" }}>
              <tr style={{ textAlign: "left" }}>
                <th>Product</th>
                <th>Price per unit</th>
                <th>Weight per unit</th>
                <th>Quantity</th>
                <th>Total Weight</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {saleProducts.map((product, index) => (
                <tr
                  key={product.productId}
                  style={{
                    borderBottom:
                      index !== saleProducts.length - 1
                        ? "1px solid #ccc"
                        : "none",
                  }}
                >
                  <td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={`/Assets/${product.pictureUrl}`}
                        alt={`Product ${product.productName}`}
                        style={{
                          width: "120px",
                          height: "auto",
                          marginRight: "10px",
                        }}
                      />
                      <div>
                        <p>{product.productName}</p>
                      </div>
                    </div>
                  </td>
                  <td>${Number(product.price).toFixed(2)}</td>
                  <td>
                    {product.weight !== "N/A" ? `${product.weight}g` : "N/A"}
                  </td>
                  <td>{product.quantity}</td>
                  <td>
                    {product.weight !== "N/A"
                      ? `${(product.quantity * product.weight).toFixed(2)}g`
                      : "N/A"}
                  </td>
                  <td>${(product.quantity * product.price).toFixed(2)}</td>
                </tr>
              ))}
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <td
                  colSpan="5"
                  style={{
                    fontWeight: "bold",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                  }}
                >
                  Total Amount
                </td>
                <td
                  style={{
                    fontWeight: "bold",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                  }}
                >
                  ${Number(totalPrice).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>No products found for this sale.</p>
        )}
      </div>
    </div>
  );
}

export default OrderDetails;
