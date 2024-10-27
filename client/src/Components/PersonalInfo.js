import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const PersonalInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loginId = location.state?.loginId;

  const [formData, setFormData] = useState({
    loginId: loginId,
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!loginId) {
      setErrorMessage("Missing login ID. Please try signing up again.");
    }
    console.log("LoginId received:", loginId);
  }, [loginId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginId) {
      setErrorMessage("Missing login ID. Please try signing up again.");
      return;
    }

    try {
      const requestData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
        latitude: null,
        longitude: null,
      };

      console.log("Sending data to server:", requestData);

      const response = await axios.put(
        "http://localhost:8080/customerinfo",
        requestData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        navigate("/Login");
      }
    } catch (error) {
      setErrorMessage("Failed to save personal information");
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("/Assets/assortedVegetablesForLogin.jpeg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="bg-white p-4 rounded-4 w-25">
          <h2 className="text-center">User Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName">
                <strong>First Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                name="firstName"
                className="form-control form-control-md rounded-2"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="lastName">
                <strong>Last Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter last name"
                name="lastName"
                className="form-control form-control-md rounded-2"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone">
                <strong>Phone</strong>
              </label>
              <input
                type="tel"
                placeholder="Enter phone number"
                name="phone"
                className="form-control form-control-md rounded-2"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address">
                <strong>Shipping Address</strong>
              </label>
              <input
                type="text"
                placeholder="Enter address"
                name="address"
                className="form-control form-control-md rounded-2"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            <button type="submit" className="btn btn-md btn-dark w-100 px-5">
              <strong>Complete Registration</strong>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
