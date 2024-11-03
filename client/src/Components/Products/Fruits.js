import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Fruits({ addToCart }) {
  const [theData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // if the state is false it will go to true, and if it is true it will go to false
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // New state for selected product

  // Toggle modal and set selected product
  const toggleModal = (product) => {
    setSelectedProduct(product); // Set the clicked product as selected
    setModal(!modal); // Toggle modal open or closed
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/products`, {
        withCredentials: true, // Keep this to maintain session
      })
      .then((res) => {
        console.log(res.data);
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
  }, []);

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
        {/* Product Section */}
        <div className="mb-4 bg-light border-0 card">
          <div className="p-9 card-body">
            <h2 className="mb-0 fs-1 mb-2">Fruits</h2>
            {/* search bar */}
            <form class="">
              <div class="input-group">
                <input
                  placeholder="Search for products"
                  class="rounded form-control product-search"
                  type="search"
                ></input>
                <span class="input-group-append">
                  <button
                    type="button"
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
                            <div className="w-25 mt-4">
                              <div className="input-spinner input-group">
                                <button
                                  type="button"
                                  className="button-minus btn btn-sm text-dark border"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-dash-lg"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"
                                    />
                                  </svg>
                                </button>
                                <input
                                  type="number"
                                  className="form-control text-center"
                                  min="1"
                                  name="quantity"
                                />
                                <button
                                  type="button"
                                  className="button-plus btn btn-sm text-dark border"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-plus-lg"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div class="mt-4 justify-content-start g-2 align-items-center row">
                              <div class="d-grid col-lg-4 col-md-5 col-6">
                                {/* Add to cart button */}
                                <button
                                  type="button"
                                  className="btn btn-green"
                                  onClick={() => {
                                    addToCart(selectedProduct);
                                    toggleModal(); // Close the modal after adding to cart
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
                                  </tr>
                                  <tr>
                                    <td className="text-secondary">
                                      Description:
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
