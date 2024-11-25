import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Tooltip from "./Tooltip";

const PersonalInfo = () => {
  const navigate = useNavigate();

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
  const [phoneError, setPhoneError] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [showPhoneTooltip, setShowPhoneTooltip] = useState(false);
  const [showZipCodeTooltip, setShowZipCodeTooltip] = useState(false);
  const [showAddressTooltip, setShowAddressTooltip] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [zipCodeFocused, setZipCodeFocused] = useState(false);
  const [addressFocused, setAddressFocused] = useState(false);
  const [isAddressValid, setIsAddressValid] = useState(false);

  const states = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const isPhoneValid = formData.phone.replace(/[^\d]/g, "").length === 10;
    const isZipCodeValid = formData.zipCode.replace(/[^\d]/g, "").length === 5;
    const isStateValid = states.includes(formData.state);
    const isFirstNameValid = formData.firstName.trim() !== "";
    const isLastNameValid = formData.lastName.trim() !== "";
    const isAddressFieldsValid = formData.addressLine1.trim() !== "" && formData.city.trim() !== "" && formData.state.trim() !== "" && formData.country.trim() !== "";
    setIsAddressValid(isPhoneValid && isZipCodeValid && isStateValid && isFirstNameValid && isLastNameValid && isAddressFieldsValid);
  }, [formData]);

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handleChange = (e) => {
    if (e.target.name === "phone") {
      const phoneRegex = /^\d*$/;
      if (!phoneRegex.test(e.target.value.replace(/[^\d]/g, ""))) {
        setPhoneError("Phone number must contain only digits.");
      } else {
        setPhoneError("");
      }
      setFormData({
        ...formData,
        [e.target.name]: formatPhoneNumber(e.target.value),
      });
    } else if (e.target.name === "zipCode") {
      const zipCodeRegex = /^\d{0,5}$/;
      if (!zipCodeRegex.test(e.target.value.replace(/[^\d]/g, ""))) {
        setZipCodeError("Zip code must contain only digits and be up to 5 digits long.");
      } else {
        setZipCodeError("");
      }
      setFormData({
        ...formData,
        [e.target.name]: e.target.value.replace(/[^\d]/g, "").slice(0, 5),
      });
    } else if (e.target.name === "state") {
      const stateValue = e.target.value.toUpperCase();
      setFormData({
        ...formData,
        [e.target.name]: stateValue,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

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
          const addressLine1 = normalizeAddressComponent(firstResult.formatted_address).includes(normalizeAddressComponent(formData.addressLine1));
          const addressLine2 = formData.addressLine2 ? normalizeAddressComponent(firstResult.formatted_address).includes(normalizeAddressComponent(formData.addressLine2)) : true;

          console.log('Validation results:', { country, state, city, postalCode, addressLine1, addressLine2 });

          if (country && state && city && postalCode && addressLine1 && addressLine2) {
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

  const getInvalidAddressComponents = () => {
    const invalidComponents = [];
    if (formData.addressLine1.trim() === "") {
      invalidComponents.push("Address Line 1");
    }
    if (formData.city.trim() === "") {
      invalidComponents.push("City");
    }
    if (formData.state.trim() === "") {
      invalidComponents.push("State");
    }
    if (formData.zipCode.replace(/[^\d]/g, "").length !== 5) {
      invalidComponents.push("Zip Code");
    }
    return invalidComponents;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/[^\d]/g, ""))) {
      setErrorMessage("Phone number must be exactly 10 digits.");
      return;
    }

    // Validate zip code
    const zipCodeRegex = /^\d{5}$/;
    if (!zipCodeRegex.test(formData.zipCode.replace(/[^\d]/g, ""))) {
      setErrorMessage("Zip code must be exactly 5 digits.");
      return;
    }

    // Validate state
    if (!states.includes(formData.state)) {
      setErrorMessage("State must be a valid two-letter code.");
      return;
    }

    // Concatenate address fields
    const fullAddress = `${formData.addressLine1}${formData.addressLine2 ? ' ' + formData.addressLine2 : ''}, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}`;

    // Validate address
    const isAddressValid = await validateAddress(fullAddress, formData);
    if (!isAddressValid) {
      const invalidComponents = getInvalidAddressComponents();
      alert(`Invalid address. Please review the following fields: ${invalidComponents.join(", ")}.`);
      return;
    }

    try {
      const requestData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: fullAddress,
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
        navigate("/Home", { state: { firstName: formData.firstName, lastName: formData.lastName } });
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
                <strong>First Name</strong> <span className="text-danger">*</span>
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
                <strong>Last Name</strong> <span className="text-danger">*</span>
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

            <div className="mb-3 position-relative">
              <label htmlFor="phone">
                <strong>Phone</strong> <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                placeholder="(xxx) xxx-xxxx"
                name="phone"
                className={`form-control form-control-md rounded-2 ${phoneError && phoneFocused ? "invalid-background" : ""}`}
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => {
                  setShowPhoneTooltip(true);
                  setPhoneFocused(true);
                }}
                onBlur={() => {
                  setShowPhoneTooltip(false);
                  setPhoneFocused(false);
                }}
                required
              />
              <Tooltip
                messages={[
                  { text: "Phone number must contain only 10 digits.", valid: formData.phone.replace(/[^\d]/g, "").length === 10 },
                ]}
                visible={showPhoneTooltip}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="addressLine1">
                <strong>Address Line 1</strong> <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter address line 1"
                name="addressLine1"
                className="form-control form-control-md rounded-2"
                value={formData.addressLine1}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="addressLine2">
                <strong>Apt, Suite, etc.</strong>
              </label>
              <input
                type="text"
                placeholder="Enter apt, suite, etc."
                name="addressLine2"
                className="form-control form-control-md rounded-2"
                value={formData.addressLine2}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="city">
                <strong>City</strong> <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter city"
                name="city"
                className="form-control form-control-md rounded-2"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 position-relative">
              <label htmlFor="state">
                <strong>State</strong> <span className="text-danger">*</span>
              </label>
              <select
                name="state"
                className={`form-control form-control-md rounded-2`}
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3 position-relative">
              <label htmlFor="zipCode">
                <strong>Zip Code</strong> <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter zip code"
                name="zipCode"
                className={`form-control form-control-md rounded-2 ${zipCodeError && zipCodeFocused ? "invalid-background" : ""}`}
                value={formData.zipCode}
                onChange={handleChange}
                onFocus={() => {
                  setShowZipCodeTooltip(true);
                  setZipCodeFocused(true);
                }}
                onBlur={() => {
                  setShowZipCodeTooltip(false);
                  setZipCodeFocused(false);
                }}
                required
              />
              <Tooltip
                messages={[
                  { text: "Zip code must contain only 5 digits.", valid: formData.zipCode.replace(/[^\d]/g, "").length === 5 },
                ]}
                visible={showZipCodeTooltip}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="country">
                <strong>Country</strong> <span className="text-danger">*</span>
              </label>
              <select
                name="country"
                className="form-control form-control-md rounded-2"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="US">United States</option>
              </select>
            </div>

            <div className="mb-3 position-relative">
              <Tooltip
                messages={[
                  { text: "Invalid address. Please enter a valid address.", valid: isAddressValid },
                ]}
                visible={showAddressTooltip}
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
