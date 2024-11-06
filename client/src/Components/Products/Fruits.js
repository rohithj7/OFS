import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";

export default function Fruits({ addToCart }) {
  const { categoryId } = useParams();
  const [theData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // if the state is false it will go to true, and if it is true it will go to false
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // New state for selected product
  const [quantity, setQuantity] = useState(1); // State to track quantity
  const [searchTerm, setSearchTerm] = useState("");

  console.log("categoryId from URL params:", categoryId);
  // Define PropTypes for the component
  Fruits.propTypes = {
    addToCart: PropTypes.func.isRequired, // Specify that addToCart is required and must be a function
  };

  // Toggle modal and set selected product
  const toggleModal = (product) => {
    setSelectedProduct(product); // Set the clicked product as selected
    setQuantity(1); // Reset quantity to 1 whenever a new product is selected
    setModal(!modal); // Toggle modal open or closed
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
    console.log("Quantity incremented to:", quantity + 1); // Check if increment works
  };
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Function to handle manual changes in the quantity input field
  const handleQuantityInput = (e) => {
    const value = e.target.value;
    // Only set if it's a positive number or empty (for easier editing)
    if (value === "" || (Number.isInteger(+value) && +value > 0)) {
      setQuantity(value === "" ? "" : +value); // Set to integer if valid, else empty string for clearing
    }
  };

  // Modify the addToCart function call to include quantity
  const handleAddToCart = (product, quantity) => {
    console.log("Adding to cart:", product, "Quantity:", quantity);
    addToCart(product, quantity); // Ensure addToCart is using the quantity correctly
  };

  useEffect(() => {
    console.log("categoryId from URL params:", categoryId);
    if (!categoryId) return;
    axios
      .get(`http://localhost:8080/products/category/${categoryId}`, {
        withCredentials: true, // Keep this to maintain session
      })
      .then((res) => {
        console.log("Products of Fruits:", res.data);
        // Check if res.data is an array, if not assign the correct value
        /*
        The setData line checks whether res.data is already an array (Array.isArray(res.data)). 
        If it is, it sets theData to res.data. 
        If it’s not an array (i.e., it’s an object containing an array under data), 
        it sets theData to res.data.data.
        */
        setData(Array.isArray(res.data) ? res.data : res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Could not fetch products.");
        setLoading(false);
      });
  }, [categoryId, searchTerm === ""]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      axios
        .get(`http://localhost:8080/product-search`, {
          params: { q: searchTerm },
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.length === 0) {
            // No items found, show alert and reset the page
            alert("No products found.");
            setSearchTerm(""); // Clear the search term to reset
          } else {
            setData(res.data); // Show products data with search results
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error searching products:", err);
          setError("Could not fetch search results.");
          setLoading(false);
        });
    }
  };

  // Handle loading, error, and empty data states
  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (theData.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div>
      <div className="container my-5">
        {/* search bar */}
        <form onSubmit={handleSearchSubmit} className="mb-4">
          <div class="input-group">
            <input
              placeholder="Search for products"
              class="rounded form-control product-search"
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
            ></input>
            <span class="input-group-append">
              <button
                type="submit"
                class="border border-start-0 ms-n10 rounded-0 rounded-end btn btn-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </span>
          </div>
        </form>
        {/* Product Section */}
        <div className="mb-4 bg-light border-0 card mt-4">
          <div className="p-9 card-body">
            <h2 className="mb-0 fs-1 mb-2">Fruits</h2>
          </div>
        </div>

        <div className="row row-cols-xl-6 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-xs-2 row-cols-12 justify-content-center g-6 mt-2">
          {/* rows-col-xl-6 => there should be six columns when the user's screen size is xl (≥1200px); rows-col-lg-4 => there should be four columns when the user's screen size is l (≥992px) */}
          {theData.map((product, index) => (
            <div key={index} className="col mb-4">
              <div className="card-product card border-2">
                <div className="card-body">
                  <Link
                    className="text-decoration-none text-center"
                    onClick={() => toggleModal(product)} // Pass product to toggleModal
                    to="#"
                  >
                    <img
                      src={`/Assets/${product.PICTURE_URL}`}
                      className="img-fluid rounded-circle"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      alt={product.PRODUCTNAME}
                    />
                    <h5 className="text-dark">{product.PRODUCTNAME}</h5>
                  </Link>
                  <div className="text-small mb-1 text-muted text-center">
                    {/* Ensure PRICE is a valid number before calling .toFixed */}
                    {parseFloat(product.PRICE)
                      ? `$${parseFloat(product.PRICE).toFixed(2)} per unit`
                      : "Price not available"}
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <button
                      className="btn btn-sm btn bg-green text-light fw-bolder"
                      onClick={() => addToCart(product)}
                      style={{
                        backgroundColor: "#99D98C",
                        color: "black",
                        transition:
                          "background-color 0.3s ease, transform 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#99D98C";
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#99D98C";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-plus-lg"
                        viewBox="0 0 16 16"
                        className="me-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                        />
                      </svg>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Implementation */}
      {modal && selectedProduct && (
        <div>
          <div className="fade modal-backdrop show"></div>
          <div
            role="dialog"
            aria-modal="true"
            className="fade modal show"
            tabIndex="-1"
            style={{ paddingLeft: "0px", display: "block" }}
          >
            <div
              id="quickViewModal"
              className="modal-dialog modal-xl modal-dialog-centered"
            >
              <div className="modal-content">
                <div className="modal-content-dialog">
                  <div className="modal-content-content">
                    <div className="p-5 modal-body">
                      <div className="position-absolute top-0 end-0 me-3 mt-3">
                        <button
                          type="button"
                          className="btn-close btn-close-primary close-modal"
                          onClick={toggleModal}
                        ></button>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <img
                            src={`/Assets/${selectedProduct.PICTURE_URL}`}
                            className="img-fluid"
                            alt={selectedProduct.PRODUCTNAME}
                          />
                        </div>
                        <div className="col-lg-6">
                          <div className="ps-lg-8 mt-6 mt-lg-0">
                            <h2 className="mb-4 h1">
                              {selectedProduct.PRODUCTNAME}
                            </h2>
                            <hr className="my-6 mt-4" />
                            <span className="fs-4 text-dark">
                              {parseFloat(selectedProduct.PRICE)
                                ? `$${parseFloat(selectedProduct.PRICE).toFixed(
                                    2
                                  )} per unit`
                                : "Price not available"}
                            </span>
                            <div className="fs-5 text-dark mt-2">
                              {selectedProduct.WEIGHT
                                ? `${selectedProduct.WEIGHT} ounce per unit`
                                : "Weight not available"}
                            </div>
                            {/* Quantity control */}
                            <div className="w-25 mt-4">
                              <div className="input-spinner input-group input-group-sm">
                                <input
                                  className="button-minus btn btn-sm border"
                                  type="button"
                                  value="-"
                                  onClick={decrementQuantity}
                                />
                                <input
                                  className="form-control form-control-sm form-input border text-center"
                                  type="number"
                                  min="1"
                                  value={quantity}
                                  onChange={handleQuantityInput}
                                  onBlur={() => {
                                    // Ensure quantity is at least 1 if left empty
                                    if (quantity == "") setQuantity(1);
                                  }}
                                />
                                <input
                                  className="button-plus btn btn-sm border"
                                  type="button"
                                  value="+"
                                  onClick={incrementQuantity}
                                />
                              </div>
                            </div>
                            <div class="mt-4 justify-content-start g-2 align-items-center row">
                              <div class="d-grid col-lg-4 col-md-5 col-6">
                                {/* Add to cart button */}
                                <button
                                  type="button"
                                  className="btn btn-green"
                                  onClick={() => {
                                    handleAddToCart(selectedProduct, quantity); // Pass selectedProduct and quantity
                                    toggleModal(); // Close the modal after adding to cart
                                  }}
                                  style={{
                                    backgroundColor: "#99D98C",
                                    color: "black",
                                    transition:
                                      "background-color 0.3s ease, transform 0.2s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      "#99D98C";
                                    e.currentTarget.style.transform =
                                      "scale(1.05)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      "#99D98C";
                                    e.currentTarget.style.transform =
                                      "scale(1)";
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-cart-plus me-2"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z" />
                                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                  </svg>
                                  Add to cart
                                </button>
                              </div>
                            </div>
                            <hr className="my-6 mt-4"></hr>
                            <div>
                              <table className="table table-borderless">
                                <tbody>
                                  <tr>
                                    <td className="text-secondary">
                                      Product ID:
                                    </td>
                                    <td className="text-secondary">
                                      {selectedProduct.ID}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="text-secondary">
                                      Availability:
                                    </td>
                                    <td className="text-secondary">
                                      {selectedProduct.QUANTITY > 0
                                        ? "In Stock"
                                        : "Out of Stock"}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="text-secondary">Type:</td>
                                    <td className="text-secondary">
                                      {selectedProduct.CATEGORYID === 1
                                        ? "Fruits"
                                        : "Other"}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="text-secondary">Brand:</td>
                                    <td className="text-secondary">
                                      {selectedProduct.BRAND}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="text-secondary">
                                      Description:
                                    </td>
                                    <td className="text-secondary">
                                      {selectedProduct.PRODUCTDESCRIPTION}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
