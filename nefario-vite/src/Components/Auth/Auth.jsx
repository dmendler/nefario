import React from "react";
import { Link } from "react-router-dom";

/* AUTH MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const AuthModule = () => {
  return (
    <div>
      <Link to="/register">
        <button>Register</button>
      </Link>
      <br />
      <br />
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default AuthModule;
