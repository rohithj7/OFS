import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Tooltip from "./Tooltip";

function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
  const [showConfirmPasswordTooltip, setShowConfirmPasswordTooltip] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, firstTimeLogin } = location.state || {};

  useEffect(() => {
    if (!firstTimeLogin) {
      navigate("/login");
    }
  }, [firstTimeLogin, navigate]);

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
    setError("");

    const passwordErrors = validatePassword(newPassword);
    const passwordError = passwordErrors.find((error) => !error.valid);
    if (passwordError) {
      setError(passwordError.text);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8080/update-password",
        {
          email,
          newPassword,
          firstTimeLogin: true,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Password updated successfully. Please login again.");
        navigate("/Login");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setError(error.response?.data?.message || "Failed to update password");
    }
  };

  const passwordErrors = validatePassword(newPassword);
  const passwordError = passwordErrors.find((error) => !error.valid);
  const passwordsMatch = newPassword === confirmPassword;
  const isPasswordValid = passwordErrors.every((error) => error.valid);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 my-5">
          <div className="p-4 card my-5">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Update Password</h2>
              <p className="text-center text-muted mb-4">
                Please set a new password for your account
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3 position-relative">
                  <label htmlFor="newPassword" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${passwordError && passwordFocused ? "invalid-background" : ""}`}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onFocus={() => {
                      setShowPasswordTooltip(true);
                      setPasswordFocused(true);
                    }}
                    onBlur={() => {
                      setShowPasswordTooltip(false);
                      setPasswordFocused(false);
                    }}
                    required
                    minLength="6"
                  />
                  <Tooltip messages={validatePassword(newPassword)} visible={showPasswordTooltip} />
                </div>

                <div className="mb-3 position-relative">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${!passwordsMatch && confirmPasswordFocused ? "invalid-background" : ""}`}
                    id="confirmPassword"
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
                    minLength="6"
                    disabled={!isPasswordValid}
                  />
                  <Tooltip
                    messages={[
                      { text: "Passwords must match", valid: passwordsMatch },
                    ]}
                    visible={showConfirmPasswordTooltip}
                  />
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <div className="d-grid gap-2 mb-2">
                  <button type="submit" className="btn btn-green mt-3">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
