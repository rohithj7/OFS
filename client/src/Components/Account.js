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
    <>
      <div class="py-5 mt-5 container w-75 w-lg-50 w-xl-50">
        {/* <div class="card border-0 shadow-sm mb-4">
          <div class="card-body p-lg-5">
            <div class="mb-5">
                <h4 class="mb-1">Account Information</h4>
                <p class="mb-0 fs-6">Edit your personal information and address.</p>
            </div>
            <form class="row g-3 needs-validation" novalidate="">
                <div class="col-lg-6 col-md-12">
                  <label for="profileFirstNameInput" class="form-label">First Name</label>
                  <input type="text" class="form-control" id="profileFirstNameInput" value="Jitu" required=""/>
                  <div class="invalid-feedback">Please enter firstname.</div>
                </div>
                <div class="col-lg-6 col-md-12">
                  <label for="profileLastNameInput" class="form-label">Last Name</label>
                  <input type="text" class="form-control" id="profileLastNameInput" value="Chauhan" required=""/>
                  <div class="invalid-feedback">Please enter lastname.</div>
                </div>
                <div class="col-lg-6">
                  <label for="profilePhoneInput" class="form-label">Phone</label>
                  <input type="text" class="form-control input-phone" id="profilePhoneInput" placeholder="+1 4XX XXX XXXX" required=""/>
                  <div class="invalid-feedback">Please enter phone.</div>
                </div>
                <div class="col-lg-6">
                  <label for="profileBirthdayInput" class="form-label">Birthday</label>
                  <input type="text" class="form-control input-date" id="profileBirthdayInput" placeholder="dd/mm/yyyy" required=""/>
                  <div class="invalid-feedback">Please enter birthday.</div>
                </div>
              
                <div class="col-12 mt-4">
                  <button class="btn btn-primary me-2" type="submit">Save Changes</button>
                  <button class="btn btn-light" type="submit">Cancel</button>
                </div>
            </form>
          </div>
        </div> */}
        <div class="row">
            <div class="mt-5 card-lg card border border-2">
              <h3 class="pt-4 my-2 fs-3 text-center fw-bold">Account Details</h3>
              <div class="p-4 card-body">
              {/* <div class="row justify-content-center">
                <div class="col-auto">
                  <label class="form-label">First Name</label>
                </div>
                <div class="col-auto">
                  <input type="text" class="form-control"name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}/>
                </div>
                <div class="col-auto">
                  <span id="passwordHelpInline" class="form-text">
                    Must be 8-20 characters long.
                  </span>
                </div>
            </div> */}
           

            
            <div class="mb-4 row">
              <label class="col-sm-2 col-form-label">First Name</label>
              <div class="col-sm-10">
                <input 
                  type="text" 
                  class="form-control" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}/>
              </div>
            </div>
            <div class="mb-4 row">
              <label class="col-sm-2 col-form-label">Last Name</label>
              <div class="col-sm-10">
                <input 
                  type="text" 
                  className="form-control"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}/>
              </div>
            </div>
            <div class="mb-4 row">
              <label class="col-sm-2 col-form-label">Address</label>
              <div class="col-sm-10">
                <input 
                  type="text" 
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}/>
              </div>
            </div>
            <div class="mb-4 row">
              <label class="col-sm-2 col-form-label">Phone</label>
              <div class="col-sm-10">
                <input 
                  type="text" 
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}/>
              </div>
            </div>
            <div class="mt-4 mb-3 d-grid gap-2 mx-auto">
              <button type="button" onClick={handleSave} class="fw-bold btn text-white bg-green border-0 justify-content-center">Save</button>
            </div>
            


                {/* <div class="row">
                  <div class="row col-lg-5">
                    <form class="" method="post">
                      <div class="mb-3 account">
                        <label class="form-label">First Name</label>
                        <input type="text"
                        className="form-control"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}/>
                      </div>
                      <div class="mb-3 account">
                        <label class="form-label">Last Name</label>
                        <input type="text"
                        className="form-control"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}/>
                      </div>
                      <div class="mb-3 account">
                        <label class="form-label">Address</label>
                        <input type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}/>
                      </div>
                      <div class="mb-3 account">
                        <label class="form-label">Phone</label>
                        <input type="text"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}/>
                      </div>
                      <div class="mb-3 account">
                        <button type="button" onClick={handleSave} class="fw-bold btn btn-primary bg-green border-0">Save</button>
                      </div>
                    </form>
                  </div>
                </div> */}
                      

                    

                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                {successMessage && <p className="text-success">{successMessage}</p>}

                      
                    
              </div>
            </div>
          </div>
      </div>
    </>
  );
}
