import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const backgroundStyle = {
    backgroundImage: `url("/Assets/assortedVegetablesForLogin.jpeg")`, // Relative to public folder
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw",
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation for matching passwords
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        // Redirect to home page or login after successful signup
        navigate("/Login");
      }
    } catch (error) {
      setErrorMessage("Error occurred, please try again");
      console.error("Error during signup:", error);
    }
  };

  return (
    <div style={backgroundStyle}>
      <div className="signup d-flex justify-content-center align-items-center vh-100">
        <div className="bg-white p-4 rounded-4 w-25">
          <h2 className="text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="form-control form-control-md rounded-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
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
            <div className="mb-3">
              <label htmlFor="confirmPassword">
                <strong>Confirm Password</strong>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                className="form-control form-control-md rounded-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            <button type="submit" className="btn btn-md btn-dark w-100 px-5">
              <strong>Sign Up</strong>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
