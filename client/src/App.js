import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Ensure Bootstrap JS is loaded

import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import PersonalInfo from "./Components/PersonalInfo";
import Account from "./Components/Account";
import Orders from "./Components/Orders";
import OrderDetails from "./Components/OrderDetails";
import Fruits from "./Components/Products/Fruits";
import Vegetables from "./Components/Products/Vegetables";
import Meats from "./Components/Products/Meats";
import Dairy from "./Components/Products/Dairy";
import Snacks from "./Components/Products/Snacks";
import Meals from "./Components/Products/Meals";

import "./main.scss"; // Custom styles
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // State for managing loading spinner
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8080/logout", {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      alert("Logged out successfully");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  console.log("Current isAuthenticated state:", isAuthenticated); // Logs the state on every render

  // ProtectedRoute component
  const ProtectedRoute = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
      setShowModal(true); // Show the modal if not authenticated
      return <Navigate to="/Login" replace />; // Redirect to login if not authenticated
    }

    return children; // Render the protected component
  };

  // Add PropTypes validation
  ProtectedRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
  };

  // const minusButton = document.getElementsByClassName('button-minus');
  // const plusButton = document.getElementsByClassName('button-plus');
  const inputField = document.getElementsByClassName("quantity-input");

  // when the minus button or the plus button is clicked, the input field with the number (quantity of a certain product) should be incremented
  // does not work properly yet
  const handleMinus = async (e) => {
    e.preventDefault();
    const currentValue = Number(inputField.value) || 0;
    // console.log(currentValue);
    inputField.value = currentValue - 1;
    console.log(inputField.value);
  };

  const handlePlus = async (e) => {
    e.preventDefault();
    const currentValue = Number(inputField.value) || 0;
    // console.log(currentValue);
    inputField.value = currentValue + 1;
    console.log(inputField.value);
  };

  return (
    <BrowserRouter>
      <div>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg bg-green">
          <div className="container">
            <Link to="/Home" className="navbar-brand fw-bold">
              GroceryGo
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav ms-auto">
                {isAuthenticated ? (
                  <>
                    <button
                      className="btn me-2"
                      type="button"
                      data-bs-toggle="offcanvas"
                      href="#offcanvasShoppingCart"
                      role="button"
                      aria-controls="offcanvasShoppingCart"
                    >
                      Cart
                    </button>
                    {/* Dropdown menu for My Account */}
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle btn me-2"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        My Account
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <li>
                          <Link className="dropdown-item" to="/Account">
                            Account Settings
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/Orders">
                            View Orders
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <button
                      className="btn me-2"
                      type="button"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn me-2" type="button">
                      Cart
                    </button>
                    {/* Dropdown menu for My Account */}
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle btn me-2"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        My Account
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <li>
                          <Link className="dropdown-item" to="/Account">
                            Account Settings
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/Orders">
                            View Orders
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <Link to="/Login" className="btn me-2">
                      Login
                    </Link>
                    <Link to="/Signup" className="btn me-2">
                      Sign Up
                    </Link>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route
            path="/Login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />

          {/* Public Routes */}
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Home" element={<Home />} />
          <Route
            path="/Products/Fruits"
            element={<Fruits isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/Products/Vegetables"
            element={<Vegetables isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/Products/Meats"
            element={<Meats isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/Products/Dairy"
            element={<Dairy isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/Products/Snacks"
            element={<Snacks isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/Products/Meals"
            element={<Meals isAuthenticated={isAuthenticated} />}
          />

          {/* Protected Routes */}
          <Route path="/personal-info" element={<PersonalInfo />} />
          <Route
            path="/Account"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Orders"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/OrderDetails/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* Shopping cart sidebar  */}
        {/* when the Cart button is selected, this will open up (this is done through these specifications for the cart button: data-bs-toggle="offcanvas" href="#offcanvasShoppingCart") */}
        <div
          class="offcanvas offcanvas-end w-50 border-box"
          tabindex="-1"
          id="offcanvasShoppingCart"
          aria-labelledby="offcanvasShoppingCartLabel"
        >
          {/* offcanvas => gives the darkened background when the sidebar is opened; offcanvas-end => the sidebar opens up on the right side */}
          {/* w-50 => sidebar will at all times be 50% of the screen size */}
          <div class="border-bottom offcanvas-header">
            {" "}
            {/* border-bottom => there will be a border (gray line) underneath the header */}
            <div class="text-start">
              {" "}
              {/* text-start => any text begins at the left */}
              <h5 class="mb-0 fs-4">Shopping Cart</h5>{" "}
              {/* mb-0 => no margin bottom; fs-4 => font size for text */}
              {/* <small>Location in 382480</small> */}
            </div>
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>{" "}
            {/* X button (close button) on top right corner that closes the sidebar */}
          </div>
          <div class="offcanvas-body">
            {/* alert banner for free delivery alert if customer is eligible */}
            <div role="alert" class="p-2 alert alert-custom border-green">
              You’ve got FREE delivery. Start{" "}
              <a class="alert-link" href="#!">
                checkout now!
              </a>
            </div>
            {/* p-2 => padding size; alert-custom => css specifications are in App.css file */}

            {/* list for products in shoping cart */}
            <ul class="list-group list-group-flush">
              {" "}
              {/* list-group-flush => remove some borders and rounded corners to render list group items: https://getbootstrap.com/docs/5.3/components/list-group/#flush */}
              <li class="pb-3 ps-0 mb-3 d-flex justify-content-between align-items-center border-bottom list-group-item">
                {/* justify-content-between => gives space in between each of the following direct child elements (in this case the div elements that are immediate children) */}
                {/* border-bottom => gray border underneath/after each list-item (after each product) */}

                {/* product image */}
                <div class="col-md-2 col-lg-2 col-4">
                  <img
                    src="/Assets/cheddar cheese.jpeg"
                    class="img-fluid rounded-3"
                  ></img>{" "}
                  {/* img-fluid => this is what allows the image to be much smaller than it's actual dimensions */}
                </div>

                {/* simple product description (name, etc.) */}
                <div class="col-md-3 col-lg-3 col-xl-3">
                  {/* (column) size of this production description section based on the screen size (md => medium-sized screen, lg => large-sized screen) */}
                  <h6 class="text-muted">Dairy</h6>
                  <h6 class="mb-0">Cheddar Cheese</h6>

                  {/* option to remove product from shopping cart */}
                  <div class="mt-2 small lh-1">
                    <a class="text-decoration-none text-inherit" href="#!">
                      <span class="me-1 align-text-bottom">
                        {/* trash can icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="text-danger"
                        >
                          {" "}
                          {/* text-danger => gives the icon a red color */}
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </span>
                      <span class="text-muted">Remove</span>
                    </a>
                  </div>
                </div>

                {/* plus minus button (for changing the quantity of a product) */}
                <div class="col-lg-3 col-md-4 col-4">
                  <div class="input-spinner input-group input-group-sm">
                    <input
                      class="button-minus btn btn-sm btn-number border"
                      type="button"
                      value="-"
                    ></input>{" "}
                    {/* minus */}
                    <input
                      class="form-control form-control-sm form-input border"
                      type="number"
                      min="1"
                      name="quantity"
                    ></input>{" "}
                    {/* input field for quantity */}
                    <input
                      class="button-plus btn btn-sm btn-number border"
                      type="button"
                      value="+"
                    ></input>{" "}
                    {/* plus */}
                  </div>
                </div>

                {/* total cost for current product */}
                <div class="text-center col-md-2 col-2">
                  <span class="fw-bold">$86.40</span>
                </div>
              </li>
              <li class="pb-3 ps-0 mb-3 d-flex justify-content-between align-items-center border-bottom list-group-item">
                <div class="col-md-2 col-lg-2 col-4">
                  <img
                    src="/Assets/bananas.jpg"
                    class="img-fluid rounded-3"
                  ></img>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                  <h6 class="text-muted">Fruits</h6>
                  <h6 class="mb-0">Bananas</h6>
                  <div class="mt-2 small lh-1">
                    <a class="text-decoration-none text-inherit" href="#!">
                      <span class="me-1 align-text-bottom">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="text-danger"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </span>
                      <span class="text-muted">Remove</span>
                    </a>
                  </div>
                </div>
                <div class="col-lg-3 col-md-4 col-4">
                  <div class="input-spinner input-group input-group-sm">
                    <input
                      class="button-minus btn btn-sm border"
                      type="button"
                      value="-"
                    ></input>
                    <input
                      class="form-control form-control-sm form-input border"
                      type="number"
                      min="1"
                      name="quantity"
                    ></input>
                    <input
                      class="button-plus btn btn-sm border"
                      type="button"
                      value="+"
                    ></input>
                  </div>
                </div>
                <div class="text-center col-md-2 col-2">
                  <span class="fw-bold">$86.40</span>
                </div>
              </li>
              <li class="pb-3 ps-0 mb-3 d-flex justify-content-between align-items-center border-bottom list-group-item">
                <div class="col-md-2 col-lg-2 col-4">
                  <img
                    src="/Assets/carrots.jpeg"
                    class="img-fluid rounded-3"
                  ></img>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                  <h6 class="text-muted">Vegetables</h6>
                  <h6 class="mb-0">Carrots</h6>
                  <div class="mt-2 small lh-1">
                    <a class="text-decoration-none text-inherit" href="#!">
                      <span class="me-1 align-text-bottom">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="text-danger"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </span>
                      <span class="text-muted">Remove</span>
                    </a>
                  </div>
                </div>
                <div class="col-lg-3 col-md-4 col-4">
                  <div class="input-spinner input-group input-group-sm">
                    <input
                      class="button-minus btn btn-sm border"
                      type="button"
                      value="-"
                    ></input>
                    <input
                      class="form-control form-control-sm form-input border"
                      type="number"
                      min="1"
                      name="quantity"
                    ></input>
                    <input
                      class="button-plus btn btn-sm border"
                      type="button"
                      value="+"
                    ></input>
                  </div>
                </div>
                <div class="text-center col-md-2 col-2">
                  <span class="fw-bold">$86.40</span>
                </div>
              </li>
              <li class="pb-3 ps-0 mb-3 d-flex justify-content-between align-items-center border-bottom list-group-item">
                <div class="col-md-2 col-lg-2 col-4">
                  <img
                    src="/Assets/whole milk.jpeg"
                    class="img-fluid rounded-3"
                  ></img>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                  <h6 class="text-muted">Dairy</h6>
                  <h6 class="mb-0">Whole Milk</h6>
                  <div class="mt-2 small lh-1">
                    <a class="text-decoration-none text-inherit" href="#!">
                      <span class="me-1 align-text-bottom">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="text-danger"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </span>
                      <span class="text-muted">Remove</span>
                    </a>
                  </div>
                </div>
                <div class="col-lg-3 col-md-4 col-4">
                  <div class="input-spinner input-group input-group-sm">
                    <input
                      class="button-minus btn btn-sm border"
                      onClick={handleMinus}
                      type="button"
                      value="-"
                    ></input>
                    <input
                      class="form-control form-control-sm form-input border quantity-input"
                      type="number"
                      min="1"
                      name="quantity"
                    ></input>
                    <input
                      class="button-plus btn btn-sm border"
                      onClick={handlePlus}
                      type="button"
                      value="+"
                    ></input>
                  </div>
                </div>
                <div class="text-center col-md-2 col-2">
                  <span class="fw-bold">$86.40</span>
                </div>
              </li>
            </ul>

            {/* option to remove all items from shopping cart */}
            <div className="d-grid gap-2 mt-2">
              <button type="button" class="btn btn-green fw-bold">
                Remove All
              </button>
            </div>

            <h2 class="h5 mt-3 mb-3">Summary</h2>
            <div class="mb-3 card">
              {" "}
              {/* card=> a flexible and extensible content container (more information: https://getbootstrap.com/docs/5.3/components/card) */}
              <div class="list-group list-group-flush">
                <div class="d-flex justify-content-between align-items-start list-group-item">
                  <div class="me-auto">
                    <div class="">Item Subtotal</div>
                  </div>
                  <span class="">$179.95</span>
                </div>
                <div class="d-flex justify-content-between align-items-start list-group-item">
                  <div class="me-auto">
                    <div class="">Total Weight</div>
                  </div>
                  <span class="">12 pounds</span>
                </div>
                <div class="d-flex justify-content-between align-items-start list-group-item">
                  <div class="me-auto">
                    <div class="">Cart Size</div>
                  </div>
                  <span class="">10</span>
                </div>
                <div class="d-flex justify-content-between align-items-start list-group-item">
                  <div class="me-auto">
                    <div class="">Shipping Fee</div>
                  </div>
                  <span class="">$0.00</span>
                </div>
                <div class="d-flex justify-content-between align-items-start list-group-item">
                  <div class="me-auto">
                    <div class="fw-bold">Subtotal</div>
                  </div>
                  <span class="fw-bold">$212.34</span>
                </div>
              </div>
            </div>

            {/* option to remove all items from shopping cart */}
            <div class="d-flex justify-content-between mt-4">
              {" "}
              {/* more information on flex behavior => https://getbootstrap.com/docs/5.3/utilities/flex/#enable-flex-behaviors */}
              <button
                type="button"
                class="btn btn-mint"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                Continue Shopping
              </button>
              <button type="button" class="btn btn-pastelblue">
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
