import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./AuthService";
import AuthLoginForm from "./AuthLoginForm";

/* STATEFUL PARENT COMPONENT */
const AuthLogin = ({ setIsLoggedIn }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // React Router hook for navigation

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    loginUser(userCredentials).then((user) => {
      if (user) {
        alert(`Welcome back, ${user.get("firstName")}!`);
        setIsLoggedIn(true); // Set the logged-in state to true
        navigate("/add"); // Redirect to dashboard after login
      } else {
        alert("Invalid email or password.");
        navigate("/");
      }
    });
  };

  const onBack = () => {
    navigate("/auth"); // Redirect back to auth
  }

  return (
    <div>
      <AuthLoginForm
        user={userCredentials}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
        onBack={onBack} // Pass the onBack function to the form
      />
    </div>
  );
};

export default AuthLogin;
