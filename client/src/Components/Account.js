import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Account() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const states = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  // Fetch customer info when the component loads
  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const response = await axios.get("http://localhost:8080/customerinfo", {
          withCredentials: true,
        });

        const addressParts = response.data.ADDRESS.split(", ");
        const stateZip = addressParts[2].split(" ");
        setFormData({
          firstName: response.data.FIRSTNAME || "",
          lastName: response.data.LASTNAME || "",
          phone: response.data.PHONE || "",
          addressLine1: addressParts[0] || "",
          addressLine2: "",
          city: addressParts[1] || "",
          state: stateZip[0] || "",
          zipCode: stateZip[1] || "",
          country: addressParts[3] || "United States",
        });
      } catch (error) {
        console.error("Error fetching customer info:", error);
        setErrorMessage("Failed to load customer information.");
      }
    };
    fetchCustomerInfo();
  }, []);

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  // Handle input changes for form
  const handleChange = (e) => {
    if (e.target.name === "phone") {
      const phoneRegex = /^\d*$/;
      if (!phoneRegex.test(e.target.value.replace(/[^\d]/g, ""))) {
        setErrorMessage("Phone number must contain only digits.");
      } else {
        setErrorMessage("");
      }
      setFormData({
        ...formData,
        [e.target.name]: formatPhoneNumber(e.target.value),
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Submit updated info to backend
  const handleSave = async () => {
    try {
      const fullAddress = `${formData.addressLine1} ${formData.addressLine2}, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}`;
      const requestData = {
        firstName: formData.firstName || null,
        lastName: formData.lastName || null,
        phone: formData.phone || null,
        address: fullAddress || null,
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
    <>
      <div class="py-5 mt-3 mb-5 container w-75">
        <div class="row mt-5">
          <div class="p-4 card-lg card border border-2">
            <h3 class="pt-4 my-2 fs-3 ms-4">Your Information</h3>
            <div class="p-4 card-body">
              <p><strong>First Name:</strong> {formData.firstName}</p>
              <p><strong>Last Name:</strong> {formData.lastName}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Address:</strong> {`${formData.addressLine1} ${formData.addressLine2}, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}`}</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="mt-5 p-4 card-lg card border border-2">
            <h3 class="pt-4 my-2 fs-3 ms-4">Account Details</h3>
            <p class="mb-0 fs-6 ms-4">Edit your personal information.</p>
            <div class="p-4 card-body">
              <form class="row g-3">
                <div class="col-lg-6 col-md-12">
                  <label class="form-label">First Name</label>
                  <input 
                    type="text" 
                    class="form-control bg-white" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}/>
                </div>
                <div class="col-lg-6 col-md-12">
                  <label class="form-label">Last Name</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}/>
                </div>
                <div class="col-lg-6 col-md-12 mt-4">
                  <label class="form-label">Phone</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}/>
                </div>
                <div class="col-lg-6 col-md-12 mt-4">
                  <label class="form-label">Address Line 1</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}/>
                </div>
                <div class="col-lg-6 col-md-12 mt-4">
                  <label class="form-label">Apt, Suite, etc.</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}/>
                </div>
                <div class="col-lg-6 col-md-12 mt-4">
                  <label class="form-label">City</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}/>
                </div>
                <div class="col-lg-6 col-md-12 mt-4">
                  <label class="form-label">State</label>
                  <select
                    name="state"
                    className="form-control"
                    value={formData.state}
                    onChange={handleChange}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="col-lg-6 col-md-12 mt-4">
                  <label class="form-label">Zip Code</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}/>
                </div>
                <div class="col-lg-6 col-md-12 mt-4">
                  <label class="form-label">Country</label>
                  <select
                    name="country"
                    className="form-control"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="United States">United States</option>
                  </select>
                </div>
                <div class="col-12 mt-4">
                  <button type="button" onClick={handleSave} class="fw-bold btn text-white bg-green border-0 p-2">Save Changes</button>
                </div>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                {successMessage && <p className="text-success">{successMessage}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
