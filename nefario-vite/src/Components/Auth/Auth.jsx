import React from "react";
import { Link } from "react-router-dom";

/* AUTH MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const AuthModule = () => {
  return (
      <center>
      <div>
        <Link to="/register">
          <button type="button" className="btn btn-secondary btn-lg">Register</button>
        </Link>
        <br />
        <br />
        <Link to="/login">
          <button type="button" className="btn btn-secondary btn-lg">Login</button>
        </Link>
      </div>
    </center>
  );
};

export default AuthModule;
