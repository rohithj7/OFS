import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import DeliveryMap from "./DeliveryMap";

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
        return "Sales Not Started";
      case "ONGOING":
        return "Sales Ongoing";
      case "COMPLETED":
        return "Sales Completed";
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

  // Filter the current and previous orders based on order status
  const currentOrder = orders.filter((order) => order.saleStatus === "ONGOING");
  const previousOrders = orders.filter(
    (order) => order.saleStatus === "COMPLETED" // Adjusted based on delivery status
  );

  return (
    <>
      <div className="container">
        {!showPreviousOrders && (
          <div className="row">
            <div className="col-xl-6 col-lg-6 mt-5">
              <div className="d-flex justify-content-between">
                <div className="h3 text-center mt-4">Current Orders</div>
                {/* Button to Toggle between Current and Previous Orders */}
                <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
                  <button
                    className="btn btn-lg bg-mint text-light fw-bold mt-3 ms-1 w-md-100"
                    onClick={() => setShowPreviousOrders(!showPreviousOrders)}
                    style={{
                      cursor: "pointer",
                      transform: isHovered ? "scale(1.05)" : "scale(1)",
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {showPreviousOrders ? "Back" : "Order History"}
                  </button>
                </div>
              </div>

              <div className="table-responsive">
                {loading ? (
                  <div className="text-muted">Fetching data...</div>
                ) : currentOrder.length > 0 ? (
                  <table className="table-responsive-md table table-borderless border border-2 table-hover">
                    <thead className="table-light">
                      <tr className="text-center">
                        <th>
                          <div className="py-4 text-uppercase">Order ID</div>
                        </th>
                        <th>
                          <div className="py-4 text-uppercase">Order Total</div>
                        </th>
                        <th>
                          <div className="py-4 text-uppercase">Date</div>
                        </th>
                        <th>
                          <div className="py-4 text-uppercase">View Order</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentOrder.map((order) => (
                        <tr className="text-center" key={order.saleId}>
                          <th className="py-4 align-middle">{order.saleId}</th>
                          <td className="py-4 align-middle">
                            $
                            {Number(order.totalPrice).toFixed(2)}
                          </td>
                          <td className="py-4 align-middle">
                            {new Date(order.saleDate).toLocaleDateString()}
                          </td>
                          <td className="py-4 align-middle">
                            <Link
                              to={`/OrderDetails/${order.saleId}`}
                              state={{
                                orderDate: order.saleDate,
                                orderStatus: order.saleStatus,
                                orderAmount: order.totalPrice,
                                shippingAddress: shippingAddress,
                              }}
                              className="btn btn-green btn-sm fw-bold text-white"
                            >
                              View Order
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No current orders</p>
                )}
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 mt-lg-5 mt-xl-5 mt-md-3 mt-sm-3">
              <div className="h3 text-center mt-4 mb-3">
                Status
                <span className="py-4">
                  <span className="ms-2 p-2 text-uppercase badge bg-pastelblue">
                    {currentOrder.length > 0
                      ? renderStatusText(currentOrder[0].saleStatus)
                      : "N/A"}
                  </span>
                </span>
              </div>

              <div className="card m-1 border-2">
                <div className="card-header px-3 pt-4 border-0 bg-light">
                  <p className="mt-1 mb-4 text-center fs-5">
                    Shipping Address:{" "}
                    <span>{shippingAddress || "Loading..."}</span>
                  </p>
                </div>
                <div className="h3 text-center mt-4 mb-3">Delivery Map</div>
                <div className="card m-1 border-2">
                  <div className="card-body p-4" style={{ height: "650px" }}>
                    <DeliveryMap /> {/* Replaced MapComponent with DeliveryMap */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showPreviousOrders && (
        <div className="previous-orders container my-5">
          <div className="d-flex justify-content-between">
            <div className="h3 text-center mt-4">Order History</div>
            {/* Button to Toggle between Current and Previous Orders */}
            <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
              <button
                className="btn btn-lg bg-mint text-light fw-bold mt-3 ms-1 w-md-100"
                onClick={() => setShowPreviousOrders(!showPreviousOrders)}
                style={{
                  cursor: "pointer",
                  transform: isHovered ? "scale(1.05)" : "scale(1)",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {showPreviousOrders ? "Back" : "Order History"}
              </button>
            </div>
          </div>

          {previousOrders.length > 0 ? (
            previousOrders.map((order) => (
              <div className="table-responsive mb-4" key={order.saleId}>
                <table className="table-responsive-md table table-borderless border border-2 table-hover">
                  <thead className="table-light">
                    <tr className="text-center">
                      <th>
                        <div className="py-4 text-uppercase">Order ID</div>
                      </th>
                      <th>
                        <div className="py-4 text-uppercase">Order Total</div>
                      </th>
                      <th>
                        <div className="py-4 text-uppercase">Date</div>
                      </th>
                      <th>
                        <div className="py-4 text-uppercase">Shipping Address</div>
                      </th>
                      <th>
                        <div className="py-4 text-uppercase">Order Status</div>
                      </th>
                      <th>
                        <div className="py-4 text-uppercase">View Order</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center" key={order.saleId}>
                      <th className="py-4 align-middle">{customerInfo.id}</th>
                      <td className="py-4 align-middle">
                        $
                        {Number(order.totalPrice).toFixed(2)}
                      </td>
                      <td className="py-4 align-middle">
                        {new Date(order.saleDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 align-middle">
                        <span className="small">
                          Shipping Address: {shippingAddress || "Loading..."}
                        </span>
                      </td>
                      <td className="py-4 align-middle">
                        <span className="p-2 text-uppercase badge bg-green">
                          {renderStatusText(order.saleStatus)}
                        </span>
                      </td>
                      <td className="py-4 align-middle">
                        <Link
                          className="btn btn-pastelblue btn-sm fw-bold text-white"
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
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <p>No previous orders</p>
          )}
        </div>
      )}
    </>
  );
}

export default Orders;