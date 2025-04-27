import React from "react";
import { Link } from "react-router-dom";

/* AUTH MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const AuthModule = () => {
  return (
    <center>
      <div>
        <h3>In order to use coaching tools, please make an account or login</h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <Link to="/register">
            <button type="button" className="btn btn-secondary btn-lg">Register</button>
          </Link>
          <Link to="/login">
            <button type="button" className="btn btn-secondary btn-lg">Login</button>
          </Link>
        </div>
      </div>
    </center>
  );
};

export default AuthModule;
