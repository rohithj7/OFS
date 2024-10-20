import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom"; // Import useLocation
import { Link } from "react-router-dom";
import axios from "axios";

function OrderDetails() {
  const { id } = useParams(); // This hooks extract the `id` from the URL
  const routerLocation = useLocation(); // Renamed to avoid the ESLint error
  const { orderDate, orderStatus, orderAmount } = routerLocation.state || {}; // Extract order date, total price, status from state (calling from Orders.js)
  const [shippingAddress, setShippingAddress] = useState(null); // State to store shipping address
  const [orderProducts, setOrderProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to convert status text
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
    setLoading(true);
    setTimeout(() => {
      // Simulate an async API call
      let simulatedData = [];

      // Simulate different products based on the order ID
      if (id === "101") {
        simulatedData = [
          {
            ID: 101,
            PRODUCTNAME: "Apples",
            PICTURE_URL: "/Assets/apples.jpeg",
            QUANTITY: 2,
            WEIGHT: 5,
            PRICE: 15.0,
          },
          {
            ID: 101,
            PRODUCTNAME: "Whole Milk",
            PICTURE_URL: "/Assets/whole milk.jpeg",
            QUANTITY: 1,
            WEIGHT: 5,
            PRICE: 5.0,
          },
          {
            ID: 101,
            PRODUCTNAME: "Lamb Chops",
            PICTURE_URL: "/Assets/lamb chops.jpeg",
            QUANTITY: 2,
            WEIGHT: 1,
            PRICE: 3.5,
          },
          {
            ID: 102,
            PRODUCTNAME: "Onions",
            PICTURE_URL: "/Assets/onions.jpeg",
            QUANTITY: 2,
            WEIGHT: 5,
            PRICE: 7.5,
          },
          {
            ID: 102,
            PRODUCTNAME: "Broccoli",
            PICTURE_URL: "/Assets/broccoli.jpeg",
            QUANTITY: 1,
            WEIGHT: 1,
            PRICE: 3.5,
          },
        ];
      } else if (id === "102") {
        simulatedData = [
          {
            ID: 102,
            PRODUCTNAME: "Ground Beef",
            PICTURE_URL: "/Assets/beef.jpeg",
            QUANTITY: 3,
            WEIGHT: 5,
            PRICE: 7.5,
          },
          {
            ID: 102,
            PRODUCTNAME: "Eggs",
            PICTURE_URL: "/Assets/eggs.jpeg",
            QUANTITY: 12,
            WEIGHT: 1,
            PRICE: 3.5,
          },
        ];
      } else if (id === "103") {
        simulatedData = [
          {
            ID: 103,
            PRODUCTNAME: "Bananas",
            PICTURE_URL: "/Assets/bananas.jpeg",
            QUANTITY: 5,
            WEIGHT: 3,
            PRICE: 1.5,
          },
          {
            ID: 103,
            PRODUCTNAME: "Orange Juice",
            PICTURE_URL: "/Assets/orange-juice.jpeg",
            QUANTITY: 1,
            WEIGHT: 2,
            PRICE: 4.0,
          },
        ];
      } else {
        simulatedData = [
          {
            ID: id,
            PRODUCTNAME: "Unknown Product",
            PICTURE_URL: "/Assets/placeholder.jpeg",
            QUANTITY: 0,
            WEIGHT: 0,
            PRICE: 0.0,
          },
        ];
      }
      setOrderProducts(simulatedData); // Set the simulated data to state
      setLoading(false);
    }, 1000);

    const simulateShippingAddress = () => {
      setTimeout(() => {
        // Simulated address data
        const simulatedAddress = "1234 Main St, San Jose, CA, 95112";
        setShippingAddress(simulatedAddress);
      }, 1000);
    };
    simulateShippingAddress();

    /*
    const fetchOrderProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("");
        setOrderProducts(response.data);
      } catch (err) {
        setError('Failed to fetch order products: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderProducts();

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
  }, [id]); // Dependency array with `id` ensures this effect runs when `id` changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="container text-left my-5">
        <h3 style={{ marginBottom: "40px" }}>Order Details</h3>
        <p style={{ fontSize: "0.7rem" }}>Order ID: {id}</p>
        <p style={{ fontSize: "0.7rem" }}>Order Date: {orderDate}</p>
        <p style={{ fontSize: "0.7rem" }}>
          Shipping Address: {shippingAddress}
        </p>
        <p style={{ fontSize: "0.7rem" }}>
          Order Status: {renderOrderStatus(orderStatus)}
        </p>
        {orderProducts.length > 0 ? (
          <table style={{ width: "100%", marginTop: "20px" }}>
            <thead style={{ backgroundColor: "#f0f0f0" }}>
              {" "}
              {/* Apply grey background here */}
              <tr style={{ textAlign: "left" }}>
                <th>Product</th>
                <th>Quantity</th>
                <th>Weight</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {orderProducts.map((product, index) => (
                <tr
                  key={product.PRODUCTNAME}
                  style={{
                    borderBottom:
                      index !== orderProducts.length - 1
                        ? "1px solid #ccc"
                        : "none", // Thin line between products
                  }}
                >
                  <td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={product.PICTURE_URL}
                        alt={`Product ${product.PRODUCTNAME}`}
                        style={{
                          width: "120px",
                          height: "auto",
                          marginRight: "10px",
                        }}
                      />
                      <div>
                        <p> {product.PRODUCTNAME}</p>
                      </div>
                    </div>
                  </td>
                  <td>{product.QUANTITY}</td>
                  <td>{product.WEIGHT}g</td>
                  <td>${product.PRICE.toFixed(2)}</td>
                </tr>
              ))}
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <td
                  style={{
                    fontWeight: "bold",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                  }}
                >
                  Amount
                </td>
                <td></td>
                <td></td>
                <td
                  style={{
                    fontWeight: "bold",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                  }}
                >
                  ${orderAmount.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default OrderDetails;
