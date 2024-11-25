import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PasswordValidation from "./PasswordValidation";
import ConfirmPasswordValidation from "./ConfirmPasswordValidation";
import Tooltip from "./Tooltip";

export const validatePassword = (password) => {
  const minLength = 14;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return [
    { text: "Password must be at least 14 characters long", valid: password.length >= minLength },
    { text: "Password must contain at least one uppercase letter", valid: hasUpperCase },
    { text: "Password must contain at least one lowercase letter", valid: hasLowerCase },
    { text: "Password must contain at least one number", valid: hasNumber },
    { text: "Password must contain at least one special character", valid: hasSpecialChar },
  ];
};

export default function SignUp() {
  const backgroundStyle = {
    backgroundImage: `url("https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/assortedVegetablesForLogin.jpeg?raw=true")`, // Relative to public folder
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
  const [showConfirmPasswordTooltip, setShowConfirmPasswordTooltip] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : "Invalid email format";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    if (emailError) {
      setErrorMessage(emailError);
      return;
    }

    const passwordErrors = validatePassword(password);
    const passwordError = passwordErrors.find((error) => !error.valid);
    if (passwordError) {
      setErrorMessage(passwordError.text);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      // First register
      const registerResponse = await axios.post(
        "http://localhost:8080/registerCustomer",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (registerResponse.status === 201) {
        // Automatically log the user in after successful registration
        const loginResponse = await axios.post(
          "http://localhost:8080/login",
          { email, password },
          { withCredentials: true }
        );

        if (loginResponse.status === 200) {
          // Redirect to PersonalInfo page
          navigate("/personal-info", { state: { email } });
        }
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error occurred, please try again");
      }
      console.error("Error during signup:", error);
    }
  };

  const passwordErrors = validatePassword(password);
  const passwordError = passwordErrors.find((error) => !error.valid);
  const passwordsMatch = password === confirmPassword;
  const isPasswordValid = passwordErrors.every((error) => error.valid);

  return (
    <div style={backgroundStyle}>
      <div className="signup d-flex justify-content-center align-items-center vh-100">
        <div className="bg-white p-4 rounded-4 w-90">
          <h2 className="text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong> <span className="text-danger">*</span>
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
            <div className="mb-3 position-relative">
              <label htmlFor="password">
                <strong>Password</strong> <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className={`form-control form-control-md rounded-2 ${passwordError && passwordFocused ? "invalid-background" : ""}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => {
                  setShowPasswordTooltip(true);
                  setPasswordFocused(true);
                }}
                onBlur={() => {
                  setShowPasswordTooltip(false);
                  setPasswordFocused(false);
                }}
                required
              />
              <Tooltip messages={validatePassword(password)} visible={showPasswordTooltip} />
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="confirmPassword">
                <strong>Confirm Password</strong> <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                className={`form-control form-control-md rounded-2 ${!passwordsMatch && confirmPasswordFocused ? "invalid-background" : ""}`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => {
                  setShowConfirmPasswordTooltip(true);
                  setConfirmPasswordFocused(true);
                }}
                onBlur={() => {
                  setShowConfirmPasswordTooltip(false);
                  setConfirmPasswordFocused(false);
                }}
                required
                disabled={!isPasswordValid}
              />
              <Tooltip
                messages={[
                  { text: "Passwords must match", valid: passwordsMatch },
                ]}
                visible={showConfirmPasswordTooltip}
              />
            </div>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            <button type="submit" className="btn btn-md btn-dark w-100 px-5">
              <strong>Sign Up</strong>
            </button>
          </form>
          <p className="mt-3 text-center text-muted">
              Password reset is recommended every 90 days.
          </p>
        </div>
      </div>
    </div>
  );
}
