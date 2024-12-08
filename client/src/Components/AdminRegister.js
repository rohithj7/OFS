import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Tooltip from "./Tooltip";

export default function AdminRegister() {
  const backgroundStyle = {
    backgroundImage: `url("https://github.com/rohithj7/OFS/blob/preethi/client/public/Assets/assortedVegetablesForLogin.jpeg?raw=true")`,
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const registerResponse = await axios.post(
        "http://localhost:8080/registerAdmin",
        {
          email,
          password,
          newPassword: null,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (registerResponse.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error occurred, please try again");
      }
      console.error("Error during admin registration:", error);
    }
  };

  const passwordErrors = validatePassword(password);
  const passwordError = passwordErrors.find((error) => !error.valid);
  const passwordsMatch = password === confirmPassword;
  const isPasswordValid = passwordErrors.every((error) => error.valid);

  return (
    <div style={backgroundStyle}>
      <div className="signup d-flex justify-content-center align-items-center vh-100">
        <div className="bg-white p-4 rounded-4 w-45">
          <h2 className="text-center">Admin Registration</h2>
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
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
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
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onMouseDown={() => setShowPassword(true)} // Show password on mouse down
                  onMouseUp={() => setShowPassword(false)} // Hide password on mouse up
                  onMouseLeave={() => setShowPassword(false)} // Hide password if mouse leaves the button
                >
                  Show
                </button>
              </div>
              <Tooltip messages={validatePassword(password)} visible={showPasswordTooltip} />
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="confirmPassword">
                <strong>Confirm Password</strong> <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"} // Toggle between "text" and "password"
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
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onMouseDown={() => setShowConfirmPassword(true)} // Show confirm password on mouse down
                  onMouseUp={() => setShowConfirmPassword(false)} // Hide confirm password on mouse up
                  onMouseLeave={() => setShowConfirmPassword(false)} // Hide confirm password if mouse leaves the button
                >
                  Show
                </button>
              </div>
              <Tooltip
                messages={[
                  { text: "Passwords must match", valid: passwordsMatch },
                ]}
                visible={showConfirmPasswordTooltip}
              />
            </div>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            <button type="submit" className="btn btn-md btn-dark w-100 px-5">
              <strong>Register Admin</strong>
            </button>
          </form>
          <p className="mt-3 text-center text-muted">
              With great power comes great responsibility.
          </p>
          <p className="mt-3 text-center text-muted">
              Admin password reset is recommended every 30 days.
          </p>
        </div>
      </div>
    </div>
  );
}
