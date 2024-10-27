import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default function Login({ setIsAuthenticated }) {
  const backgroundStyle = {
    backgroundImage: `url("/Assets/assortedVegetablesForLogin.jpeg")`, // Relative to public folder
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw",
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Login.js
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/login", // Verify this port matches your backend
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Response:", response); // Add this to debug

      if (response.status === 200) {
        setIsAuthenticated(true);
        // Get the login ID from the register response
        const loginId = response.data.loginId;
        console.log("Storing loginId in localStorage:", loginId); // Debug line
        // Store loginId in local storage
        localStorage.setItem("loginId", loginId);
        navigate("/Home");
      }
    } catch (error) {
      console.log("Error details:", error.response?.data); // Add this to debug
      setErrorMessage("Login failed, please try again");
    }
  };

  return (
    <div style={backgroundStyle}>
      <div className="login d-flex justify-content-center align-items-center vh-100">
        <div className="bg-white p-4 rounded-4 w-25">
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                className="form-control form-control-md rounded-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="form-control form-control-md rounded-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            <button type="submit" className="btn btn-md btn-dark w-100 px-5">
              <strong>Login</strong>
            </button>
          </form>
          {/* Add a message and link to the signup page */}
          <div className="mt-3 text-center">
            <p>
              Don't have an account?{" "}
              <Link to="/Signup" className="text-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
