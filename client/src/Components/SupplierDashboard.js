import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SupplierDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editStatusModal, setEditStatusModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [isOrdersLoading, setIsOrdersLoading] = useState(true);
  const [orderError, setOrderError] = useState(null);

  const categories = [
    { id: "", name: "Select a category" },
    { id: "all", name: "All Products" },
    { id: "1", name: "Fruits" },
    { id: "2", name: "Vegetables" },
    { id: "3", name: "Meats" },
    { id: "4", name: "Dairy" },
    { id: "5", name: "Snacks" },
    { id: "6", name: "Meals" },
  ];

  // Fetch orders data
  useEffect(() => {
    const fetchOrders = async () => {
      setIsOrdersLoading(true);
      setOrderError(null);

      try {
        console.log("Starting orders fetch...");
        const response = await axios.get(
          "/api/orders-with-details",
          {
            withCredentials: true,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Orders response:", response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Detailed fetch error:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });

        setOrderError(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Failed to fetch orders"
        );
      } finally {
        setIsOrdersLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/products", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.response || error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      setFilteredProducts([]);
    } else if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          (product) => product?.CATEGORYID?.toString() === selectedCategory
        )
      );
    }
  }, [selectedCategory, products]);

  const toggleEditStatusModal = () => {
    setEditStatusModal(!editStatusModal);
  };

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/orders/${selectedOrderId}/status`,
        { newStatus },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === selectedOrderId
              ? { ...order, ORDER_STATUS: newStatus }
              : order
          )
        );
        toggleEditStatusModal();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const renderOrdersTable = () => {
    if (isOrdersLoading) {
      return (
        <div className="text-center p-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading orders...</span>
          </div>
        </div>
      );
    }

    if (orderError) {
      return (
        <div className="text-center p-4 text-danger">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="currentColor"
            class="bi bi-exclamation-triangle me-2 fs-5 align-middle"
            viewBox="0 0 16 16"
          >
            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
          </svg>
          {orderError}
        </div>
      );
    }

    if (!orders || orders.length === 0) {
      return <div className="text-center p-4 text-muted">No orders found</div>;
    }

    return (
      <table className="mb-0 table-centered text-nowrap table table-borderless table-hover">
        <thead className="table-light text-center">
          <tr>
            <th>
              <div className="py-3">Order ID</div>
            </th>
            <th>
              <div className="py-3">Date</div>
            </th>
            <th>
              <div className="py-3">Product</div>
            </th>
            <th>
              <div className="py-3">Brand</div>
            </th>
            <th>
              <div className="py-3">Quantity</div>
            </th>
            <th>
              <div className="py-3">Price</div>
            </th>
            <th>
              <div className="py-3">Status</div>
            </th>
            <th>
              <div className="py-3">Actions</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId} className="text-center">
              <td className="py-4 align-middle">{order.orderId}</td>
              <td className="py-4 align-middle">
                {new Date(order.ORDERDATE).toLocaleDateString()}
              </td>
              <td className="py-4 align-middle">
                {order.PRODUCTNAME}{" "}
                <span className="text-muted">(ID: {order.productId})</span>
              </td>
              <td className="py-4 align-middle">{order.BRAND}</td>
              <td className="py-4 align-middle">{order.QUANTITY}</td>
              <td className="py-4 align-middle">${order.productPrice}</td>
              <td className="py-4 align-middle">
                <span
                  className={`p-2 text-uppercase badge ${
                    order.ORDER_STATUS === "NOT STARTED"
                      ? "bg-warning"
                      : order.ORDER_STATUS === "ONGOING"
                      ? "bg-mint"
                      : order.ORDER_STATUS === "COMPLETED"
                      ? "bg-success"
                      : "bg-secondary"
                  }`}
                >
                  {order.ORDER_STATUS}
                </span>
              </td>
              <td className="py-4 align-middle">
                <button
                  className="btn btn-outline-0 btn-sm fw-bold hover-shadow"
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  onClick={() => {
                    setSelectedOrderId(order.orderId);
                    setNewStatus(order.ORDER_STATUS);
                    toggleEditStatusModal();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    class="bi bi-pencil-square fs-5 me-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                    />
                  </svg>
                  Edit Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="mt-5 container">
      {orderError && (
        <div className="alert alert-danger" role="alert">
          {orderError}
        </div>
      )}
      {isOrdersLoading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="mt-5 mb-5 col-xl-12 col-lg-12 col-md-12 col-12">
            <div className="h-100 card-lg card border border-2">
              <h3 className="p-4 my-2 fs-5 text-center">Orders to Fulfill</h3>
              <div className="p-0 card-body">
                <div className="table-responsive rounded-1">
                  {renderOrdersTable()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Status Modal */}
      {editStatusModal && (
        <div>
          <div className="fade modal-backdrop show"></div>
          <div
            role="dialog"
            aria-modal="true"
            className="fade modal show"
            tabIndex="-1"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Update Order Status</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={toggleEditStatusModal}
                  ></button>
                </div>
                <form onSubmit={handleStatusUpdate}>
                  <div className="modal-body">
                    <select
                      className="form-select"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                    >
                      <option value="">Select new status</option>
                      <option value="NOT STARTED">NOT STARTED</option>
                      <option value="ONGOING">ONGOING</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-mint"
                      onClick={toggleEditStatusModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-green"
                      disabled={!newStatus}
                    >
                      Update Status
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SupplierDashboard;
