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
          "http://localhost:8080/orders-with-details",
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
        const response = await axios.get("http://localhost:8080/products", {
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
        `http://localhost:8080/orders/${selectedOrderId}/status`,
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
          <i className="bi bi-exclamation-triangle me-2"></i>
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
                  <i className="bi bi-pencil-square"></i> Edit Status
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

      {/* Products Section */}
      <div className="row mt-5">
        <div className="mb-5 col-xl-12 col-lg-12 col-md-12 col-12">
          <div className="h-100 card-lg card border border-2">
            <div className="d-flex justify-content-between align-items-center p-4">
              <h3 className="fs-5 mb-0">
                Products
                {selectedCategory && (
                  <span className="text-muted ms-2">
                    ({filteredProducts.length}{" "}
                    {selectedCategory === "all" ? "total" : "items"})
                  </span>
                )}
              </h3>
              <div className="d-flex align-items-center">
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  disabled={isLoading}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="p-0 card-body">
              {isLoading ? (
                <div className="text-center p-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : !selectedCategory ? (
                <div className="text-center p-4 text-muted">
                  Please select a category to view products
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center p-4 text-muted">
                  No products found in this category
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table-centered text-nowrap table table-hover">
                    <thead className="table-light text-center">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price per Unit</th>
                        <th scope="col">Weight Per Unit</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Description</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Reorder Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr
                          key={product.ID}
                          className={`${
                            product.QUANTITY <= product.REORDERLEVEL
                              ? "table-danger"
                              : ""
                          }`}
                        >
                          <td className="text-center">{product.ID}</td>
                          <td className="text-center">
                            <img
                              src={`/Assets/${product.PICTURE_URL}`}
                              alt={product.PRODUCTNAME}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                              }}
                            />
                          </td>
                          <td className="text-center">{product.PRODUCTNAME}</td>
                          <td className="text-center">{product.CATEGORYID}</td>
                          <td className="text-center">${product.PRICE}</td>
                          <td className="text-center">{product.WEIGHT} oz</td>
                          <td className="text-center">{product.BRAND}</td>
                          <td className="text-center">
                            {product.PRODUCTDESCRIPTION}
                          </td>
                          <td className="text-center">{product.QUANTITY}</td>
                          <td className="text-center">
                            {product.REORDERLEVEL}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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
                      className="btn btn-secondary"
                      onClick={toggleEditStatusModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
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
