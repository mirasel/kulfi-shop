import React from "react";
import { Link } from "react-router-dom";
import "./Denied.scss";

function Denied() {
  return (
    <div className="denied">
      <div className="denied-content">
        <h1>Permission Denied</h1>
        <p>You are not an Admin user.</p>
        <p>
          Go to <Link to="/">Home</Link>
        </p>
      </div>
    </div>
  );
}

export default Denied;
