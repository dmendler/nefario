import React from "react";
import { authenticateUser } from "../../Components/Auth/AuthService";
import AuthModule from "../../Components/Auth/Auth";

// You can pass props using the spread operator to throw them on an object if there are too many to break out
const ProtectedRoute = ({ element: Component, ...rest }) => {
  console.log("element: ", Component);
  if (authenticateUser()) {
    return <Component />;
  } else {
    return <AuthModule />;
  }
};

export default ProtectedRoute;
