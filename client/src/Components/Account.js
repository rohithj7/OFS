import React, { useState, useEffect } from "react";
import axios from "axios";
import Tooltip from "./Tooltip"; // Import Tooltip component

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function normalizeAddressComponent(component) {
  return component.toLowerCase().replace(/\b(dr|st|rd|ave|blvd|ln|ct|pl|sq|ter|pkwy|cir|apt|ste)\b/g, match => {
    switch (match) {
      case 'dr': return 'drive';
      case 'st': return 'street';
      case 'rd': return 'road';
      case 'ave': return 'avenue';
      case 'blvd': return 'boulevard';
      case 'ln': return 'lane';
      case 'ct': return 'court';
      case 'pl': return 'place';
      case 'sq': return 'square';
      case 'ter': return 'terrace';
      case 'pkwy': return 'parkway';
      case 'cir': return 'circle';
      case 'apt': return 'apartment';
      case 'ste': return 'suite';
      default: return match;
    }
  });
}

function validateAddress(address, formData) {
  const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleMapsApiKey}`;

  return fetch(geocodingUrl)
    .then(response => response.json())
    .then(data => {
      console.log('Geocoding API response:', data);
      if (data.status === 'OK' && data.results.length > 0) {
        const firstResult = data.results[0];
        const addressComponents = firstResult.address_components;

        const country = addressComponents.find(c => c.types.includes('country'))?.short_name === 'US';
        const state = addressComponents.find(c => c.types.includes('administrative_area_level_1'))?.short_name === formData.state;
        const city = addressComponents.find(c => c.types.includes('locality') || c.types.includes('sublocality') || c.types.includes('postal_town'))?.long_name.toLowerCase() === formData.city.toLowerCase();
        const postalCode = addressComponents.find(c => c.types.includes('postal_code'))?.short_name === formData.zipCode;
        const addressLine = normalizeAddressComponent(firstResult.formatted_address).includes(normalizeAddressComponent(formData.addressLine));

        console.log('Validation results:', { country, state, city, postalCode, addressLine });

        if (country && state && city && postalCode && addressLine ) {
          console.log('Address is valid:', address);
          return true;
        } else {
          console.log('Address may be invalid or ambiguous:', address);
          return false;
        }
      } else {
        console.log('Address not found:', address);
        return false;
      }
    })
    .catch(error => {
      console.error('Error fetching geocoding data:', error);
      return false;
    });
}

export default function NewAccount() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPhoneTooltip, setShowPhoneTooltip] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [savedData, setSavedData] = useState(null); // Add state for saved data

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
        const fetchedData = {
          firstName: response.data.FIRSTNAME || "",
          lastName: response.data.LASTNAME || "",
          phone: response.data.PHONE || "",
          addressLine: addressParts[0] || "",
          city: addressParts[1] || "",
          state: stateZip[0] || "",
          zipCode: stateZip[1] || "",
          country: addressParts[3] || "United States",
        };
        setFormData(fetchedData);
        setSavedData(fetchedData); // Set saved data
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
      const phoneDigits = e.target.value.replace(/[^\d]/g, "");
      if (phoneDigits.length > 10) {
        setErrorMessage("Phone number must be exactly 10 digits.");
      } else {
        setErrorMessage("");
        setFormData({
          ...formData,
          [e.target.name]: formatPhoneNumber(phoneDigits),
        });
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const isFormValid = () => {
    const phoneDigits = formData.phone.replace(/[^\d]/g, "");
    const isPhoneValid = phoneDigits.length === 10;
    const isStateValid = states.includes(formData.state);
    const isZipCodeValid = formData.zipCode.replace(/[^\d]/g, "").length === 5;
    const isFirstNameValid = formData.firstName.trim() !== "";
    const isLastNameValid = formData.lastName.trim() !== "";
    const isAddressLineValid = formData.addressLine.trim() !== "";
    const isCityValid = formData.city.trim() !== "";
    const isCountryValid = formData.country.trim() !== "";

    return isPhoneValid && isStateValid && isZipCodeValid && isFirstNameValid && isLastNameValid && isAddressLineValid && isCityValid && isCountryValid;
  };

  const isFormChanged = () => {
    return (
      formData.firstName !== savedData?.firstName ||
      formData.lastName !== savedData?.lastName ||
      formData.phone !== savedData?.phone ||
      formData.addressLine !== savedData?.addressLine ||
      formData.city !== savedData?.city ||
      formData.state !== savedData?.state ||
      formData.zipCode !== savedData?.zipCode ||
      formData.country !== savedData?.country
    );
  };

  // Submit updated info to backend
  const handleSave = async () => {
    try {
      const fullAddress = `${formData.addressLine}, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}`;
      const requestData = {
        firstName: formData.firstName || null,
        lastName: formData.lastName || null,
        phone: formData.phone || null,
        address: fullAddress,
        latitude: null,
        longitude: null,
      };

      const phoneDigits = formData.phone.replace(/[^\d]/g, "");
      if (phoneDigits.length !== 10) {
        setErrorMessage("Phone number must be exactly 10 digits.");
        return;
      }

      const isAddressValid = await validateAddress(fullAddress, formData);
      if (!isAddressValid) {
        alert("Invalid address. Please enter a valid address.");
        return;
      }

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
        alert("Information updated successfully.");
        setSavedData(formData); // Update saved data
        setErrorMessage(""); // Clear error message on success
      }
    } catch (error) {
      console.error("Error updating customer info:", error);
      setErrorMessage("Failed to update information. Please try again.");
    }
  };

  return (
    <>
      <div className="py-5 mt-3 mb-5 container w-75">
        <div className="row mt-5">
          <div className="p-4 card-lg card border border-2">
            <h3 className="pt-4 my-2 fs-3 ms-4">Your Information</h3>
            <div className="p-4 card-body">
              <p><strong>First Name:</strong> {savedData ? savedData.firstName : formData.firstName}</p>
              <p><strong>Last Name:</strong> {savedData ? savedData.lastName : formData.lastName}</p>
              <p><strong>Phone:</strong> {savedData ? savedData.phone : formData.phone}</p>
              <p><strong>Address:</strong> {savedData ? `${savedData.addressLine}, ${savedData.city}, ${savedData.state} ${savedData.zipCode}, ${savedData.country}` : `${formData.addressLine}, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}`}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="mt-5 p-4 card-lg card border border-2">
            <h3 className="pt-4 my-2 fs-3 ms-4">Account Details</h3>
            <p className="mb-0 fs-6 ms-4">Edit your personal information.</p>
            <div className="p-4 card-body">
              <form className="row g-3">
                <div className="col-lg-6 col-md-12">
                  <label className="form-label">First Name</label>
                  <input 
                    type="text" 
                    className="form-control bg-white" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}/>
                </div>
                <div className="col-lg-6 col-md-12">
                  <label className="form-label">Last Name</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}/>
                </div>
                <div className="col-lg-6 col-md-12 mt-4 position-relative">
                  <label className="form-label">Phone</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => {
                      setShowPhoneTooltip(true);
                      setPhoneFocused(true);
                    }}
                    onBlur={() => {
                      setShowPhoneTooltip(formData.phone.replace(/[^\d]/g, "").length !== 10);
                      setPhoneFocused(false);
                    }}
                  />
                  <Tooltip
                    messages={[
                      { text: "Phone number must contain only 10 digits.", valid: formData.phone.replace(/[^\d]/g, "").length === 10 },
                    ]}
                    visible={showPhoneTooltip}
                  />
                </div>
                <div className="col-lg-6 col-md-12 mt-4">
                  <label className="form-label">Address Line</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="addressLine"
                    value={formData.addressLine}
                    onChange={handleChange}/>
                </div>
                <div className="col-lg-6 col-md-12 mt-4">
                  <label className="form-label">City</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}/>
                </div>
                <div className="col-lg-6 col-md-12 mt-4">
                  <label className="form-label">State</label>
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
                <div className="col-lg-6 col-md-12 mt-4">
                  <label className="form-label">Zip Code</label>
                  <input 
                    type="text" 
                    className="form-control"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}/>
                </div>
                <div className="col-lg-6 col-md-12 mt-4">
                  <label className="form-label">Country</label>
                  <select
                    name="country"
                    className="form-control"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="United States">United States</option>
                  </select>
                </div>
                <div className="col-12 mt-4">
                  <button 
                    type="button" 
                    onClick={handleSave} 
                    className="fw-bold btn text-white bg-green border-0 p-2"
                    disabled={!isFormValid() || !isFormChanged()}
                  >
                    Save Changes
                  </button>
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