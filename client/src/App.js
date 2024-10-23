import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Ensure Bootstrap JS is loaded

import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
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

  // Check authentication using the /userinfo backend route
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("http://localhost:8080/userinfo", {
          withCredentials: true, // Sends the session cookie to the backend
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log("User not authenticated", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Once the check is done, stop loading
      }
    };

    checkAuthStatus();
  }, []);

  // Handle logout action
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

  // If loading, show a loading spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  // ProtectedRoute component
  const ProtectedRoute = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/Login" replace />; // Redirect to login if not authenticated
    }

    return children; // Render the protected component
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
          <Route
            path="/Login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Products/Fruits" element={<Fruits />} />
          <Route path="/Products/Vegetables" element={<Vegetables />} />
          <Route path="/Products/Meats" element={<Meats />} />
          <Route path="/Products/Dairy" element={<Dairy />} />
          <Route path="/Products/Snacks" element={<Snacks />} />
          <Route path="/Products/Meals" element={<Meals />} />

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
