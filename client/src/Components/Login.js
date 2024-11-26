import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
  setUserRole: PropTypes.func.isRequired,
};

export default function Login({ setIsAuthenticated, setCart, setUserRole }) {
  const backgroundStyle = {
    backgroundImage: `url("https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/assortedVegetablesForLogin.jpeg?raw=true")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw",
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Add this state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        setIsAuthenticated(true);
        setUserRole(response.data.role);
        setCart([]);

        // Handle first-time login for employees or suppliers
        console.log("Response data:", response.data);
        if (
          (response.data.role === "employee" ||
            response.data.role === "supplier") &&
          response.data.firstTimeLogin
        ) {
          console.log("First-time login detected for employee");
          navigate("/update-password", {
            state: {
              email: email,
              firstTimeLogin: true,
            },
          }); // Navigate to password update page
          return;
        }

        switch (response.data.role) {
          case "customer":
            navigate("/Home");
            break;
          case "admin":
            navigate("/ManagerDashboard");
            break;
          case "employee":
            navigate("/EmployeeDashboard");
            break;
          case "supplier":
            navigate("/SupplierDashboard");
            break;
          default:
            navigate("/Home");
        }
      }
    } catch (error) {
      console.log("Error details:", error.response?.data);
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
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
                  placeholder="Password"
                  name="password"
                  className="form-control form-control-md rounded-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onMouseDown={() => setShowPassword(true)} // Show password on mouse down
                  onMouseUp={() => setShowPassword(false)} // Hide password on mouse up
                  onMouseLeave={() => setShowPassword(false)} // Hide password if mouse leaves the button
                >
                  Show
                </button>
              </div>
            </div>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            <button type="submit" className="btn btn-md btn-dark w-100 px-5">
              <strong>Login</strong>
            </button>
          </form>
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
