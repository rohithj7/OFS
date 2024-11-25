import React from "react";

export default function PasswordValidation({ password }) {
  const minLength = 14;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    <div className="password-validation">
      <p className={password.length >= minLength ? "text-success" : "text-danger"}>
        {password.length >= minLength ? "✔" : "✘"} Password must be at least 14 characters long
      </p>
      <p className={hasUpperCase ? "text-success" : "text-danger"}>
        {hasUpperCase ? "✔" : "✘"} Password must contain at least one uppercase letter
      </p>
      <p className={hasLowerCase ? "text-success" : "text-danger"}>
        {hasLowerCase ? "✔" : "✘"} Password must contain at least one lowercase letter
      </p>
      <p className={hasNumber ? "text-success" : "text-danger"}>
        {hasNumber ? "✔" : "✘"} Password must contain at least one number
      </p>
      <p className={hasSpecialChar ? "text-success" : "text-danger"}>
        {hasSpecialChar ? "✔" : "✘"} Password must contain at least one special character
      </p>
    </div>
  );
}
