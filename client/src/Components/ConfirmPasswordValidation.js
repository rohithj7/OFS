import React from "react";

export default function ConfirmPasswordValidation({ password, confirmPassword }) {
  const passwordsMatch = password === confirmPassword;

  return (
    <div className="confirm-password-validation">
      <p className={passwordsMatch ? "text-success" : "text-danger"}>
        {passwordsMatch ? "✔" : "✘"} Passwords must match
      </p>
    </div>
  );
}
