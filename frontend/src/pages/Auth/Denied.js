import React from "react";
import { Link } from "react-router-dom";
function Denied() {
  console.log("from denied");
  return (
    <div>
      <h1>Permission Denied</h1>
      <p>You are not an Admin user.</p>
      <p>
        Go to <Link to="/">Home</Link>
      </p>
    </div>
  );
}

export default Denied;
