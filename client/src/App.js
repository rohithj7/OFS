import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Add this line for Bootstrap JS
// import './App.scss';
import "./main.scss";

function App() {
  // will uncomment this when the api is ready to connect
  /*
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );
  */
  // Simulate the user being logged in by setting this to true
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Handle logout action
  const handleLogout = async () => {
    try {
      // Call the backend logout route
      /*
      await axios.get("http://localhost:8080/logout");
      */

      // After successful logout, reset authentication state
      setIsAuthenticated(false);
      localStorage.removeItem("token"); // Remove auth token from localStorage
      alert("Logged out successfully");
    } catch (err) {
      console.error("Error during logout:", err);
    }
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
                {/* Conditional buttons based on user authentication status */}
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
                            Account Setting
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
                            Account Setting
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
          ></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route
            path="/Home"
            element={<Home isAuthenticated={isAuthenticated} />}
          ></Route>
          <Route
            path="/Account"
            element={<Account isAuthenticated={isAuthenticated} />}
          ></Route>
          <Route
            path="/Orders"
            element={<Orders isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/OrderDetails/:id"
            element={<OrderDetails isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/Products/Fruits"
            element={<Fruits isAuthenticated={isAuthenticated} />}
          ></Route>
          <Route
            path="/Products/Vegetables"
            element={<Vegetables isAuthenticated={isAuthenticated} />}
          ></Route>
          <Route
            path="/Products/Meats"
            element={<Meats isAuthenticated={isAuthenticated} />}
          ></Route>
          <Route
            path="/Products/Dairy"
            element={<Dairy isAuthenticated={isAuthenticated} />}
          ></Route>
          <Route
            path="/Products/Snacks"
            element={<Snacks isAuthenticated={isAuthenticated} />}
          ></Route>
          <Route
            path="/Products/Meals"
            element={<Meals isAuthenticated={isAuthenticated} />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
