import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="container mt-5 text-center">
      <h2>Access Denied</h2>
      <p>You don't have permission to access this page.</p>
    </div>
  );
}
