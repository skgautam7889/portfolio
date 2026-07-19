import React from "react";
import { Link } from "react-router-dom";
import { BiError, BiHome } from "react-icons/bi";

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-card">
        <div className="unauthorized-icon">
          <BiError />
        </div>
        <h1>Access Denied</h1>
        <p>You don't have permission to access this page.</p>
        <p className="text-muted">
          This area is restricted to administrators only.
        </p>
        <Link to="/" className="btn-home">
          <BiHome /> Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
