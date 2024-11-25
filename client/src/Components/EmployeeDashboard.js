import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function EmployeeDashboard() {
  const [editStatusModal, setEditStatusModal] = useState(false);
  const [selectedSaleId, setSelectedSaleId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [recentSales, setRecentSales] = useState([]);
  const [viewProductsModal, setViewProductsModal] = useState(false);
  const [selectedSaleProducts, setSelectedSaleProducts] = useState([]);
  const [saleDetailsModal, setSaleDetailsModal] = useState(false);
  const [selectedSaleDetails, setSelectedSaleDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // Fetch sales data
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get("http://localhost:8080/all_sales", {
          withCredentials: true,
        });
        setRecentSales(response.data);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };
    fetchSales();
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

  // Toggle modals
  const toggleEditStatusModal = () => {
    setEditStatusModal(!editStatusModal);
  };

  const toggleViewProductsModal = () => {
    setViewProductsModal(!viewProductsModal);
  };

  // Handle status update
  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/sales/${selectedSaleId}/status`,
        { newStatus },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setRecentSales((sales) =>
          sales.map((sale) =>
            sale.ID === selectedSaleId
              ? { ...sale, SALE_STATUS: newStatus }
              : sale
          )
        );
        toggleEditStatusModal();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  // Add this new function to fetch sale details
  const fetchSaleDetails = async (saleId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/sales/${saleId}`,
        {
          withCredentials: true,
        }
      );
      setSelectedSaleDetails(response.data);
      setSaleDetailsModal(true);
    } catch (error) {
      console.error("Error fetching sale details:", error);
      alert("Failed to fetch sale details");
    }
  };

  // Add toggle function for the details modal
  const toggleSaleDetailsModal = () => {
    setSaleDetailsModal(!saleDetailsModal);
  };

  return (
    <div className="mt-5 container">
      <div className="row">
        <div className="mt-5 mb-5 col-xl-12 col-lg-12 col-md-12 col-12">
          <div className="h-100 card-lg card border border-2">
            <h3 className="p-4 my-2 fs-5 text-center">Sales to Fulfill</h3>
            <div className="p-0 card-body">
              <div className="table-responsive rounded-1">
                <table className="mb-0 table-centered text-nowrap table table-borderless table-hover">
                  <thead className="table-light text-center">
                    <tr>
                      <th>
                        <div className="py-3">Sale ID</div>
                      </th>
                      <th>
                        <div className="py-3">Date</div>
                      </th>
                      <th>
                        <div className="py-3">Status</div>
                      </th>
                      <th>
                        <div className="py-3">Actions</div>
                      </th>
                      {/* <th>
                        <div className="py-3">Delivery Fleet</div>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {recentSales.map((sale) => (
                      <tr key={sale.ID} className="text-center">
                        <th className="py-4 align-middle">
                          <Link
                            to={`/saleDetails/${sale.ID}`}
                            className="text-decoration-none"
                          >
                            {sale.ID}
                          </Link>
                        </th>
                        <td className="py-4 align-middle">
                          {new Date(sale.SALEDATE).toLocaleDateString()}
                        </td>
                        <td className="py-4 align-middle">
                          <span
                            className={`p-2 text-uppercase badge ${
                              sale.SALE_STATUS === "COMPLETED"
                                ? "bg-success"
                                : sale.SALE_STATUS === "ONGOING"
                                ? "bg-mint"
                                : "bg-warning"
                            }`}
                          >
                            {sale.SALE_STATUS}
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
                              setSelectedSaleId(sale.ID);
                              setNewStatus(sale.SALE_STATUS);
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
                        {/* <th>
                        <td className="py-4 align-middle text-center">
                          <Link
                            to={`/delivery-fleet/${sale.ID}`}
                            className="btn btn-green btn-sm d-inline-flex align-items-center justify-content-center"
                            style={{ minWidth: "120px" }}
                          >
                            <span>Track Delivery</span>
                          </Link>
                        </td>
                      </th> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                <div className="table-responsive rounded-1">
                  <table className="table-centered text-nowrap table table-hover table-borderless mb-0">
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
                          <td className="text-center align-middle">
                            {product.ID}
                          </td>
                          <td className="text-center align-middle">
                            <img
                              src={`${product.PICTURE_URL}`}
                              alt={product.PRODUCTNAME}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                              }}
                            />
                          </td>
                          <td className="text-center align-middle">
                            {product.PRODUCTNAME}
                          </td>
                          <td className="text-center align-middle">
                            {product.CATEGORYID}
                          </td>
                          <td className="text-center align-middle">
                            ${product.PRICE}
                          </td>
                          <td className="text-center align-middle">
                            {product.WEIGHT} oz
                          </td>
                          <td className="text-center align-middle">
                            {product.BRAND}
                          </td>
                          <td className="text-center align-middle">
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
                  <h5 className="modal-title">Update Sale Status</h5>
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
                      <option value="NOT STARTED">Not Started</option>
                      <option value="ONGOING">Ongoing</option>
                      <option value="COMPLETED">Completed</option>
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

      {saleDetailsModal && selectedSaleDetails && (
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
                  <h5 className="modal-title">
                    Sale Details #{selectedSaleDetails.saleId}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={toggleSaleDetailsModal}
                  ></button>
                </div>
                <div className="modal-body">
                  {/* Customer Information */}
                  <div className="mb-3">
                    <strong>Customer ID:</strong>{" "}
                    {selectedSaleDetails.customerId}
                  </div>
                  <div className="mb-3">
                    <strong>Customer Name:</strong>{" "}
                    {selectedSaleDetails.customerFirstName}{" "}
                    {selectedSaleDetails.customerLastName}
                  </div>
                  <div className="mb-3">
                    <strong>Customer Phone:</strong>{" "}
                    {selectedSaleDetails.customerPhone}
                  </div>
                  <div className="mb-3">
                    <strong>Shipping Address:</strong>{" "}
                    {selectedSaleDetails.customerAddress}
                  </div>

                  {/* Order Information */}
                  <div className="mb-3">
                    <strong>Total Amount:</strong> $
                    {parseFloat(selectedSaleDetails.totalPrice).toFixed(2)}
                  </div>
                  <div className="mb-3">
                    <strong>Order Date:</strong>{" "}
                    {new Date(
                      selectedSaleDetails.saleDate
                    ).toLocaleDateString()}
                  </div>
                  <div className="mb-3">
                    <strong>Payment Details:</strong>{" "}
                    {selectedSaleDetails.paymentDetails}
                  </div>
                  <div className="mb-3">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge ${
                        selectedSaleDetails.saleStatus === "COMPLETED"
                          ? "bg-success"
                          : selectedSaleDetails.saleStatus === "ONGOING"
                          ? "bg-mint"
                          : "bg-warning"
                      }`}
                    >
                      {selectedSaleDetails.saleStatus}
                    </span>
                  </div>

                  {/* Products Information */}
                  <div>
                    <strong>Products:</strong>
                    <ul className="list-group mt-2">
                      {selectedSaleDetails.products.map((product) => (
                        <li key={product.productId} className="list-group-item">
                          <div className="d-flex align-items-center">
                            {product.pictureUrl && (
                              <img
                                src={`${product.pictureUrl}`}
                                alt={product.productName}
                                className="me-3"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                }}
                              />
                            )}
                            <div>
                              <div className="fw-bold">
                                {product.productName}
                              </div>
                              <div className="text-muted">
                                Quantity: {product.quantity} × ${product.price}
                                <span className="ms-2">
                                  Weight: {product.weight}lb
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={toggleSaleDetailsModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeDashboard;
