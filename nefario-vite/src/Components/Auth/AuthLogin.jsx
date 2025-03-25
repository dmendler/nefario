import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "./AuthService";
import AuthLoginForm from "./AuthLoginForm";

const AuthLogin = () => {
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
    authenticateUser(userCredentials).then((user) => {
      if (user) {
        alert(`Welcome back, ${user.get("firstName")}!`);
        navigate("/add"); // Redirect to dashboard after login
      } else {
        alert("Invalid email or password.");
        navigate("/");
      }
    });
  };

  return (
    <div>
      <AuthLoginForm
        user={userCredentials}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
        isLogin={true}
      />
    </div>
  );
};

export default AuthLogin;
