import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPreviousOrders, setShowPreviousOrders] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({ id: "" });
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const renderStatusText = (status) => {
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
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/sales", {
          withCredentials: true,
        });
        console.log("Fetched orders:", response.data); // Debug line
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Could not fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    const fetchShippingAddress = async () => {
      try {
        const response = await axios.get("http://localhost:8080/customerinfo", {
          withCredentials: true,
        });
        setShippingAddress(response.data.ADDRESS);
        setCustomerInfo({
          id: response.data.ID || "N/A",
        });
      } catch (err) {
        console.error("Error fetching shipping address:", err);
        setError("Could not fetch shipping address.");
      }
    };

    fetchOrders();
    fetchShippingAddress();
  }, []);

  // Filter the current and previous orders based on saleStatus
  const currentOrder = orders.find((order) => order.saleStatus === "ONGOING");
  const previousOrders = orders.filter(
    (order) => order.saleStatus === "COMPLETED"
  );

  return (
    <div>
      <div className="container text-left my-5">
        {/* Display Current Order */}
        {!showPreviousOrders && (
          <div className="d-flex justify-content-between text-left">
            <div className="flex-grow-1 pe-2">
              {loading ? (
                <div className="text-muted">Fetching data...</div>
              ) : currentOrder ? (
                <>
                  <h3 style={{ marginBottom: "40px" }}>Current Order</h3>
                  <p>Customer ID: {customerInfo.id}</p>
                  <p>Order ID: {currentOrder.saleId}</p>
                  <p>
                    Order Total: ${Number(currentOrder.totalPrice).toFixed(2)}
                  </p>
                  <p>
                    Date: {new Date(currentOrder.saleDate).toLocaleDateString()}
                  </p>
                  <p>
                    <Link
                      to={`/OrderDetails/${currentOrder.saleId}`}
                      state={{
                        orderDate: currentOrder.saleDate,
                        orderStatus: currentOrder.saleStatus,
                        orderAmount: currentOrder.totalPrice,
                        shippingAddress: shippingAddress,
                      }}
                    >
                      View Order
                    </Link>
                  </p>
                </>
              ) : (
                <p>No current orders</p>
              )}
            </div>
            <div className="flex-grow-1">
              <div style={{ height: "300px", backgroundColor: "#ccc" }}>
                Map Placeholder
              </div>
              <div style={{ marginTop: "20px" }}>
                <p>
                  Status:{" "}
                  {currentOrder
                    ? renderStatusText(currentOrder.saleStatus)
                    : "N/A"}
                </p>
                <p>Shipping Address: {shippingAddress || "Loading..."}</p>
              </div>
            </div>
          </div>
        )}

        {/* Button to Toggle between Current and Previous Orders */}
        <button
          className="btn btn-lg bg-mint text-light fw-bold"
          onClick={() => setShowPreviousOrders(!showPreviousOrders)}
          style={{
            position: "fixed",
            bottom: "50px",
            right: "5%",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {showPreviousOrders ? "Back" : "Order History"}
        </button>

        {/* Display Previous Orders */}
        {showPreviousOrders && (
          <div
            className="previous-orders text-left"
            style={{ textAlign: "left" }}
          >
            <h3 style={{ marginBottom: "40px" }}>Order History</h3>
            {previousOrders.length > 0 ? (
              previousOrders.map((order, index) => (
                <div
                  key={order.saleId}
                  className="mt-3"
                  style={{
                    borderBottom:
                      index !== previousOrders.length - 1
                        ? "1px solid #ccc"
                        : "none",
                  }}
                >
                  <p>Customer ID: {customerInfo.id}</p>
                  <p>Order ID: {order.saleId}</p>
                  <p>Order Total: ${Number(order.totalPrice).toFixed(2)}</p>
                  <p>Date: {new Date(order.saleDate).toLocaleDateString()}</p>
                  <p>Status: {renderStatusText(order.saleStatus)}</p>
                  <p>Shipping Address: {shippingAddress || "Loading..."}</p>
                  <p>
                    <Link
                      to={`/OrderDetails/${order.saleId}`}
                      state={{
                        orderDate: order.saleDate,
                        orderStatus: order.saleStatus,
                        orderAmount: order.totalPrice,
                        shippingAddress: shippingAddress,
                      }}
                    >
                      View Order
                    </Link>
                  </p>
                </div>
              ))
            ) : (
              <p>No previous orders</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
