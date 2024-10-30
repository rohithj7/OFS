import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Account() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch customer info when the component loads
  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const response = await axios.get("http://localhost:8080/customerinfo", {
          withCredentials: true,
        });

        setFormData({
          firstName: response.data.FIRSTNAME || "",
          lastName: response.data.LASTNAME || "",
          phone: response.data.PHONE || "",
          address: response.data.ADDRESS || "",
        });
      } catch (error) {
        console.error("Error fetching customer info:", error);
        setErrorMessage("Failed to load customer information.");
      }
    };
    fetchCustomerInfo();
  }, []);

  // Handle input changes for form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit updated info to backend
  const handleSave = async () => {
    try {
      const requestData = {
        firstName: formData.firstName || null,
        lastName: formData.lastName || null,
        phone: formData.phone || null,
        address: formData.address || null,
        latitude: null,
        longitude: null,
      };

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
        setSuccessMessage("Information updated successfully.");
      }
    } catch (error) {
      console.error("Error updating customer info:", error);
      setErrorMessage("Failed to update information. Please try again.");
    }
  };

  return (
    <div>
      <div className="container text-center my-5">
        <div className="card border-0">
          <div className="card-body ms-5">
            <div className="fs-2 mb-3 mt-2 ms-3 text-start fw-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100px"
                height="100px"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
                style={{ paddingRight: "20px" }}
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                ></path>
              </svg>
              Your Profile
            </div>
            <form className="ms-5 mt-3">
              <div className="ms-5 row mb-4">
                <label className="card-text text-start fw-bold fs-4 col-sm-2">
                  First Name:
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="ms-5 row mb-4">
                <label className="card-text text-start fw-bold fs-4 col-sm-2">
                  Last Name:
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="ms-5 row mb-4">
                <label className="card-text text-start fw-bold fs-4 col-sm-2">
                  Phone:
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="ms-5 row mb-4">
                <label className="card-text text-start fw-bold fs-4 col-sm-2">
                  Address:
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {successMessage && <p className="text-success">{successMessage}</p>}

            <div className="d-grid gap-2 d-md-flex justify-content-md-end me-5">
              <button
                onClick={handleSave}
                className="btn btn-lg bg-mint text-light fw-bold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
