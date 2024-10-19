import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Orders() {
  const [orders] = useState([
    // Placeholder data simulating fetched orders
    {
      ID: 101,
      PRICE: 200.0,
      ORDERDATE: "2024-10-10",
      ORDER_STATUS: "ONGOING",
    },
    {
      ID: 102,
      PRICE: 150.0,
      ORDERDATE: "2024-09-15",
      ORDER_STATUS: "COMPLETED",
    },
    {
      ID: 103,
      PRICE: 300.0,
      ORDERDATE: "2024-08-20",
      ORDER_STATUS: "COMPLETED",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [showPreviousOrders, setShowPreviousOrders] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(null); // State to store shipping address
  const [error, setError] = useState(null);

  // Helper function to convert status text
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

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setLoading(true); // Simulate loading state
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate a delay in fetching the data

    const simulateShippingAddress = () => {
      setTimeout(() => {
        // Simulated address data
        const simulatedAddress = "1234 Main St, San Jose, CA, 95112";
        setShippingAddress(simulatedAddress);
      }, 1000);
    };
    simulateShippingAddress();
    // Uncomment the below code when the API is ready to connect
    /*
    axios.get("http://localhost:8080/orders", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });

    // Fetch shipping address from backend
    const fetchShippingAddress = async () => {
      try {
        const response = await axios.get("/userinfo");
        setShippingAddress(response.data.ADDRESS); // Save the shipping address
      } catch (err) {
        console.error("Error fetching shipping address:", err);
        setError("Could not fetch shipping address.");
      }
    };

    fetchShippingAddress();
    */
  }, []);

  // Function to filter current vs. previous orders
  const currentOrder = orders.filter(
    (order) => order.ORDER_STATUS === "ONGOING"
  )[0];
  const previousOrders = orders.filter(
    (order) => order.ORDER_STATUS !== "ONGOING"
  );

  return (
    <div>
      <div className="container text-left my-5">
        {!showPreviousOrders && (
          <div className="d-flex justify-content-between text-left">
            <div className="flex-grow-1 pe-2">
              {loading ? (
                <div className="text-muted">Fetching data...</div>
              ) : currentOrder ? (
                <>
                  <h3 style={{ marginBottom: "40px" }}>Current Order</h3>
                  <p>Order ID: {currentOrder.ID}</p>
                  <p>Order Total: ${currentOrder.PRICE.toFixed(2)}</p>
                  <p>Date: {currentOrder.ORDERDATE}</p>
                  <p>
                    <Link
                      to={`/OrderDetails/${currentOrder.ID}`}
                      state={{
                        orderDate: currentOrder.ORDERDATE,
                        orderStatus: currentOrder.ORDER_STATUS,
                        orderAmount: currentOrder.PRICE,
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
                <p>Status: {renderStatusText(currentOrder.ORDER_STATUS)}</p>
                <p>Shipping Address: {shippingAddress || "Loading..."}</p>
              </div>
            </div>
          </div>
        )}

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

        {showPreviousOrders && (
          <div
            className="previous-orders text-left"
            style={{ textAlign: "left" }}
          >
            <h3 style={{ marginBottom: "40px" }}>Order History</h3>
            {previousOrders.map((order, index) => (
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
                <p>Order ID: {order.ID}</p>
                <p>Order Total: ${order.PRICE.toFixed(2)}</p>
                <p>Date: {order.ORDERDATE}</p>
                <p>Status: {renderStatusText(order.ORDER_STATUS)}</p>
                <p>Shipping Address: {shippingAddress || "Loading..."}</p>
                <p>
                  <Link
                    to={`/OrderDetails/${order.ID}`}
                    state={{
                      orderDate: order.ORDERDATE,
                      orderStatus: order.ORDER_STATUS,
                      orderAmount: order.PRICE,
                      shippingAddress: shippingAddress,
                    }}
                  >
                    View Order
                  </Link>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
