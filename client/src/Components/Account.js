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
      <div class="py-5 mt-3 mb-5 container w-75">
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
        {/* <div class="card-body p-lg-5">
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
                           <div class="col-lg-12">
                              <label for="profileAddressInput" class="form-label">Address Line</label>
                              <input type="text" class="form-control" id="profileAddressInput" required=""/>
                              <div class="invalid-feedback">Please enter addredss.</div>
                           </div>
                           <div class="col-lg-3">
                              <label for="profileCountryInput" class="form-label">Country</label>
                              <select class="form-select" id="profileCountryInput" required="">
                                 <option selected="" disabled="" value="">Choose...</option>
                                 <option selected="" value="">India</option>
                                 <option value="Australia">Australia</option>
                                 <option value="Canada">Canada</option>
                                 <option value="Germany">Germany</option>
                              </select>
                              <div class="invalid-feedback">Please select state.</div>
                           </div>
                           <div class="col-lg-3">
                              <label for="profileStateInput" class="form-label">State / Region</label>
                              <select class="form-select" id="profileStateInput" required="">
                                 <option selected="" disabled="" value="">Choose...</option>
                                 <option selected="" value="">Gujarat</option>
                                 <option value="Rajasthan">Rajasthan</option>
                                 <option value="Goa">Goa</option>
                                 <option value="Maharashtra">Maharashtra</option>
                              </select>
                              <div class="invalid-feedback">Please select state / region.</div>
                           </div>
                           <div class="col-lg-3">
                              <label for="profileCityInput" class="form-label">State</label>
                              <select class="form-select" id="profileCityInput" required="">
                                 <option selected="" disabled="" value="">Choose...</option>
                                 <option value="Ahmedabad" selected="">Ahmedabad</option>
                                 <option value="Surat">Surat</option>
                                 <option value="Vapi">Vapi</option>
                                 <option value="Rajkot">Rajkot</option>
                              </select>
                              <div class="invalid-feedback">Please select a valid city.</div>
                           </div>
                           <div class="col-lg-3">
                              <label for="profilezipInput" class="form-label">Zip/Code</label>
                              <input type="text" class="form-control" id="profilezipInput" required=""/>
                              <div class="invalid-feedback">Please provide a zip.</div>
                           </div>
                           <div class="col-12 mt-4">
                              <button class="btn btn-primary me-2" type="submit">Save Changes</button>
                              <button class="btn btn-light" type="submit">Cancel</button>
                           </div>
                        </form>
                     </div> */}
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
                          <div class="col-lg-6 col-md-12 mt-4 mb-2">
                            <label class="form-label">Address</label>
                            <input 
                              type="text" 
                              className="form-control"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}/>
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
