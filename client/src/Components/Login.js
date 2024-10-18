import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

export default function Login() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });

      if (response.status === 200) {
        /* const { token } = response.data; // Extract the token from the response
        // Store the token in cookies (expires in 7 days)
        Cookies.set("token", token, { expires: 7, path: "/" }); */
        // Redirect to home page on successful login
        navigate("/Home");
      }
    } catch (error) {
      setErrorMessage("Login failed, please try again");
      console.error("Error during login:", error);
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
        </div>
      </div>
    </div>
  );
}
