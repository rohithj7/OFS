import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
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
import Checkout from "./Components/Checkout";
import DeliveryRoutePage from "./Components/DeliveryRoutePage";

import "./main.scss"; // Custom styles
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // State for managing loading spinner
  const [showModal, setShowModal] = useState(false);
  const [redirectToCheckout, setRedirectToCheckout] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

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

  /****** shopping cart *******/
  const [cart, setCart] = useState([]); // Cart state

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.ID === product.ID);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.ID === product.ID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to increment quantity
  const incrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.ID === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrement quantity
  const decrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.ID === productId
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.ID !== productId));
  };

  // place sales
  const proceedToCheckout = async () => {
    // Ensure cart has defined productId and quantity for each item
    const products = cart.map((item) => ({
      productId: item.ID, // Map item id to productId
      quantity: item.quantity,
    }));

    console.log("Products to checkout:", products);

    if (products.length === 0) {
      alert("Your cart is empty or contains invalid items.");
      return;
    }

    try {
      // Call the /checkout route first to verify availability
      const checkResponse = await axios.post(
        "http://localhost:8080/checkout",
        { products },
        { withCredentials: true }
      );
      if (checkResponse.status === 200) {
        console.log("Ready to checkout");
        // Close the sidebar
        const sidebar = sidebarRef.current;
        if (sidebar) {
          sidebar.classList.remove("show"); // Hides the sidebar
          sidebar.setAttribute("aria-hidden", "true"); // Update aria for accessibility
          console.log("Sidebar manually hidden");
        } else {
          console.warn("Sidebar reference or Bootstrap library not available.");
        }

        // Remove the Bootstrap offcanvas backdrop if it exists
        const backdrop = document.querySelector(".offcanvas-backdrop");
        if (backdrop) {
          backdrop.parentNode.removeChild(backdrop); // Remove the backdrop element
          document.body.classList.remove("offcanvas-backdrop"); // Remove any lingering classes
        }

        // Proceed/ready to sale placement
        navigate("/Checkout"); // Directly navigate to the checkout page
      }
    } catch (error) {
      console.error("Checkout error:", error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 && data.unavailableProducts) {
          // Specific message for unavailable products
          const unavailableItems = data.unavailableProducts
            .map(
              (item) =>
                `Product ID: ${item.productId} (Available: ${item.availableQuantity})`
            )
            .join(", ");
          alert(
            `Some products are unavailable or have insufficient quantity: ${unavailableItems}`
          );
        } else {
          alert(data.message || "There was an error processing your request.");
        }
      } else {
        alert("Error, please try again later.");
      }
    }
  };

  return (
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
                  {/* Dropdown menu for Categories */}
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle btn me-2"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Categories
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link className="dropdown-item" to="/Products/Fruits">
                          Fruits
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/Products/Vegetables"
                        >
                          Vegetables
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/Products/Meats">
                          Meats
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/Products/Dairy">
                          Dairy
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/Products/Snacks">
                          Snacks
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/Products/Meals">
                          Meals
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <button
                    className="btn me-2"
                    type="button"
                    data-bs-toggle="offcanvas"
                    href="#offcanvasShoppingCart"
                    role="button"
                    aria-controls="offcanvasShoppingCart"
                  >
                    Cart ({cart.length})
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
                  {/* Dropdown menu for Categories */}
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle btn me-2"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Categories
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link className="dropdown-item" to="/Products/Fruits">
                          Fruits
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/Products/Vegetables"
                        >
                          Vegetables
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/Products/Meats">
                          Meats
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/Products/Dairy">
                          Dairy
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/Products/Snacks">
                          Snacks
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/Products/Meals">
                          Meals
                        </Link>
                      </li>
                    </ul>
                  </li>
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
        {/* Public Routes */}
        <Route
          path="/Login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
        <Route
          path="/Products/Fruits"
          element={
            <Fruits addToCart={addToCart} isAuthenticated={isAuthenticated} />
          }
        />
        <Route
          path="/Products/Vegetables"
          element={
            <Vegetables
              addToCart={addToCart}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/Products/Meats"
          element={
            <Meats addToCart={addToCart} isAuthenticated={isAuthenticated} />
          }
        />
        <Route
          path="/Products/Dairy"
          element={
            <Dairy addToCart={addToCart} isAuthenticated={isAuthenticated} />
          }
        />
        <Route
          path="/Products/Snacks"
          element={
            <Snacks addToCart={addToCart} isAuthenticated={isAuthenticated} />
          }
        />
        <Route
          path="/Products/Meals"
          element={
            <Meals addToCart={addToCart} isAuthenticated={isAuthenticated} />
          }
        />

        {/* Protected Routes */}
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

        {/* Other Routes */}
        <Route
          path="/Checkout"
          element={<Checkout cart={cart} setCart={setCart} />}
        />
        <Route path="/personal-info" element={<PersonalInfo />} />
        <Route path="/delivery-route" element={<DeliveryRoutePage />} />
      </Routes>

      {/* Shopping Cart Sidebar */}
      <div
        ref={sidebarRef}
        className="offcanvas offcanvas-end w-50 border-box"
        tabIndex="-1"
        id="offcanvasShoppingCart"
        aria-labelledby="offcanvasShoppingCartLabel"
      >
        <div className="border-bottom offcanvas-header">
          <div className="text-start">
            <h5 className="mb-0 fs-4">Shopping Cart</h5>
          </div>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div role="alert" className="p-2 alert alert-custom border-green">
            You’ve got FREE delivery. Start{" "}
            <a className="alert-link" href="#!">
              checkout now!
            </a>
          </div>

          <ul className="list-group list-group-flush">
            {cart.map((item) => (
              <li
                key={item.ID}
                className="pb-3 ps-0 mb-3 d-flex justify-content-between align-items-center border-bottom list-group-item"
              >
                <div className="col-md-2 col-lg-2 col-4">
                  <img
                    src={`/Assets/${item.PICTURE_URL}`}
                    className="img-fluid rounded-3"
                    alt={item.PRODUCTNAME}
                  />
                </div>
                <div className="col-md-3 col-lg-3 col-xl-3">
                  <h6 className="text-muted">{item.CATEGORY}</h6>
                  <h6 className="mb-0">{item.PRODUCTNAME}</h6>
                  <div className="mt-2 small lh-1">
                    <a
                      className="text-decoration-none text-inherit"
                      href="#!"
                      onClick={() => removeFromCart(item.ID)}
                    >
                      <span className="text-muted">Remove</span>
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-4">
                  <div className="input-spinner input-group input-group-sm">
                    <input
                      className="button-minus btn btn-sm border"
                      type="button"
                      value="-"
                      onClick={() => decrementQuantity(item.ID)}
                    />
                    <input
                      className="form-control form-control-sm form-input border text-center"
                      type="number"
                      min="1"
                      value={item.quantity}
                      readOnly
                    />
                    <input
                      className="button-plus btn btn-sm border"
                      type="button"
                      value="+"
                      onClick={() => incrementQuantity(item.ID)}
                    />
                  </div>
                </div>
                <div className="text-center col-md-2 col-2">
                  <span className="fw-bold">
                    ${(item.PRICE * item.quantity).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="d-grid gap-2 mt-2">
            <button
              type="button"
              className="btn btn-green fw-bold"
              onClick={() => setCart([])}
            >
              Remove All
            </button>
          </div>

          <h2 className="h5 mt-3 mb-3">Summary</h2>
          <div className="mb-3 card">
            <div className="list-group list-group-flush">
              <div className="d-flex justify-content-between align-items-start list-group-item">
                <div className="me-auto">Item Subtotal</div>
                <span>
                  $
                  {cart
                    .reduce(
                      (total, item) => total + item.PRICE * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-start list-group-item">
                <div className="me-auto">Total Weight</div>
                <span>
                  {cart
                    .reduce(
                      (total, item) => total + item.WEIGHT * item.quantity,
                      0
                    )
                    .toFixed(2)}{" "}
                  ounce
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-start list-group-item">
                <div className="me-auto">Cart Size</div>
                <span>{cart.length}</span>
              </div>
              <div className="d-flex justify-content-between align-items-start list-group-item">
                <div className="me-auto">Shipping Fee</div>
                <span>$0.00</span>
              </div>
              <div className="d-flex justify-content-between align-items-start list-group-item">
                <div className="me-auto fw-bold">Subtotal</div>
                <span className="fw-bold">
                  $
                  {cart
                    .reduce(
                      (total, item) => total + item.PRICE * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button
              type="button"
              className="btn btn-mint"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              Continue Shopping
            </button>
            <button
              type="button"
              className="btn btn-pastelblue"
              onClick={proceedToCheckout}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
