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
  const currentOrder = orders.filter(
    (order) => order.saleStatus === "COMPLETED"
  ); // Filter all orders with saleStatus COMPLETED to display under Current Orders
  const previousOrders = orders.filter(
    (order) => order.saleStatus === "..." // need to modify based on the order delivery status
  );

  return (
    // <div>
    //   <div className="container text-left my-5">
    //     {/* Display Current Order */}
    //     {!showPreviousOrders && (
    //       <div className="d-flex justify-content-between text-left">
    //         <div className="flex-grow-1 pe-2">
    //           {loading ? (
    //             <div className="text-muted">Fetching data...</div>
    //           ) : currentOrder.length > 0 ? (
    //             <>
    //               <h3 style={{ marginBottom: "40px" }}>Current Orders</h3>
    //               {currentOrder.map((order) => (
    //                 <div key={order.saleId} style={{ marginBottom: "50px" }}>
    //                   <p>Order ID: {order.saleId}</p>
    //                   <p>Order Total: ${Number(order.totalPrice).toFixed(2)}</p>
    //                   <p>
    //                     Date: {new Date(order.saleDate).toLocaleDateString()}
    //                   </p>
    //                   <p>
    //                     <Link
    //                       to={`/OrderDetails/${order.saleId}`}
    //                       state={{
    //                         orderDate: order.saleDate,
    //                         orderStatus: order.saleStatus,
    //                         orderAmount: order.totalPrice,
    //                         shippingAddress: shippingAddress,
    //                       }}
    //                     >
    //                       View Order
    //                     </Link>
    //                   </p>
    //                 </div>
    //               ))}
    //             </>
    //           ) : (
    //             <p>No current orders</p>
    //           )}
    //         </div>
    //         <div className="flex-grow-1">
    //           <div style={{ height: "300px", backgroundColor: "#ccc" }}>
    //             Map Placeholder
    //           </div>
    //           <div style={{ marginTop: "20px" }}>
    //             <p>
    //               Status:{" "}
    //               {currentOrder
    //                 ? renderStatusText(currentOrder.saleStatus)
    //                 : "N/A"}
    //             </p>
    //             <p>Shipping Address: {shippingAddress || "Loading..."}</p>
    //           </div>
    //         </div>
    //       </div>
    //     )}

    //     {/* Button to Toggle between Current and Previous Orders */}
    //     <button
    //       className="btn btn-lg bg-mint text-light fw-bold"
    //       onClick={() => setShowPreviousOrders(!showPreviousOrders)}
    //       style={{
    //         position: "fixed",
    //         bottom: "50px",
    //         right: "5%",
    //         padding: "10px 20px",
    //         border: "none",
    //         borderRadius: "5px",
    //         cursor: "pointer",
    //         transform: isHovered ? "scale(1.05)" : "scale(1)",
    //       }}
    //       onMouseEnter={() => setIsHovered(true)}
    //       onMouseLeave={() => setIsHovered(false)}
    //     >
    //       {showPreviousOrders ? "Back" : "Order History"}
    //     </button>

    //     {/* Display Previous Orders */}
    //     {showPreviousOrders && (
    //       <div
    //         className="previous-orders text-left"
    //         style={{ textAlign: "left" }}
    //       >
    //         <h3 style={{ marginBottom: "40px" }}>Order History</h3>
    //         {previousOrders.length > 0 ? (
    //           previousOrders.map((order, index) => (
    //             <div
    //               key={order.saleId}
    //               className="mt-3"
    //               style={{
    //                 borderBottom:
    //                   index !== previousOrders.length - 1
    //                     ? "1px solid #ccc"
    //                     : "none",
    //               }}
    //             >
    //               <p>Customer ID: {customerInfo.id}</p>
    //               <p>Order ID: {order.saleId}</p>
    //               <p>Order Total: ${Number(order.totalPrice).toFixed(2)}</p>
    //               <p>Date: {new Date(order.saleDate).toLocaleDateString()}</p>
    //               <p>Status: {renderStatusText(order.saleStatus)}</p>
    //               <p>Shipping Address: {shippingAddress || "Loading..."}</p>
    //               <p>
    //                 <Link
    //                   to={`/OrderDetails/${order.saleId}`}
    //                   state={{
    //                     orderDate: order.saleDate,
    //                     orderStatus: order.saleStatus,
    //                     orderAmount: order.totalPrice,
    //                     shippingAddress: shippingAddress,
    //                   }}
    //                 >
    //                   View Order
    //                 </Link>
    //               </p>
    //             </div>
    //           ))
    //         ) : (
    //           <p>No previous orders</p>
    //         )}
    //       </div>
    //     )}
    //   </div>
    // </div>
    
    <>
      <div class="container">
      {!showPreviousOrders && (
        <div class="row">
          
          <div class="col-xl-6 col-lg-6 mt-5">
            <div class="d-flex justify-content-between">
              <div class="h3 text-center mt-4">Current Orders</div>
              {/* Button to Toggle between Current and Previous Orders */}
            <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
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
            
            
            
            <div class="table-responsive">
            {loading ? (
            <div className="text-muted">Fetching data...</div>
               ) : currentOrder.length > 0 ? (
              <table class="table-responsive-md table table-borderless border border-2 table-outline table-hover">
                <thead class="table-light">
                  <tr class="text-center">
                    
                    <th colspan="1"><div class="py-4 text-uppercase">Order ID</div></th>
                    <th colspan="1"><div class="py-4 text-uppercase">Order Total</div></th>
                    <th colspan="1"><div class="py-4 text-uppercase">Date</div></th>
                    {/* <th colspan="1"><div class="py-4 text-uppercase">Order Status</div></th> */}
                    <th colspan="1"><div class="py-4 text-uppercase">View Order</div></th>
                  </tr>
                </thead>
                <tbody>
                {currentOrder.map((order) => (
                  <tr class="text-center" key={order.saleId}>
                    <th class="py-4 align-middle">{order.saleId}</th>
                    <td class="py-4 align-middle">${Number(order.totalPrice).toFixed(2)}</td>
                    <td class="py-4 align-middle">Date: {new Date(order.saleDate).toLocaleDateString()}</td>
                    {/* <td class="py-4 align-middle"><span class="p-2 text-uppercase badge bg-green">Being prepared</span></td> */}
                    <td class="py-4 align-middle">
                    <Link
                          to={`/OrderDetails/${order.saleId}`}
                          state={{
                            orderDate: order.saleDate,
                            orderStatus: order.saleStatus,
                            orderAmount: order.totalPrice,
                            shippingAddress: shippingAddress,
                          }}
                          class="btn btn-green btn-sm fw-bold text-white"
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
          <div class="col-xl-6 col-lg-6 col-md-12 col-md-6 mt-lg-5 mt-xl-5 mt-md-3 mt-sm-3">
            <div class="card m-1 border-2">
              {/* <div class="card-header px-3 pt-4 border-0 bg-light"></div> */}
              <div class="card-body p-4">
                <div style={{ height: "400px", backgroundColor: "#ccc" }}>
                  Map Placeholder </div>
                  <p class="mt-4 text-center">Status: <span class="py-4"><span class="p-2 text-uppercase badge bg-pastelblue">{currentOrder ? renderStatusText(currentOrder.saleStatus) : "N/A"}</span></span></p>
                  <p class="mt-4 text-center">Shipping Address: <span class="py-4"><span class="">{shippingAddress || "Loading..."}</span></span></p>
              </div>
            </div>

            
          </div>
        </div>
        
      )}    
      </div>

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
          
    </>
           
  );
}

export default Orders;
