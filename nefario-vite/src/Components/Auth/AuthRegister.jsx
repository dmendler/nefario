import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "./AuthService";
import AuthForm from "./AuthForm";

/* STATEFUL PARENT COMPONENT */
const AuthRegister = ({ setIsLoggedIn }) => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // React Router hook for navigation

  // flag is the state to watch for add/remove updates
  const [add, setAdd] = useState(false);

  useEffect(() => {
    if (newUser && add) {
      createUser(newUser).then((userCreated) => {
        if (userCreated) {
          alert(
            `${userCreated.get("firstName")}, you successfully registered!`
          );
        }
        setAdd(false);
        setIsLoggedIn(true);
      });
    }
  }, [newUser, add]);

  const onChange = (e) => {
    e.preventDefault();
    console.log(e.target);
    const { name, value: newValue } = e.target;
    console.log(newValue);
    setNewUser({ ...newUser, [name]: newValue });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted: ", e.target);
    setAdd(true);
    navigate("/");
  };

  const onBack = () => {
    navigate("/auth"); // Redirect back to auth
  }

  return (
    <div>
      <AuthForm
        user={newUser}
        onChange={onChange}
        onSubmit={onSubmit}
        onBack={onBack}
      />
    </div>
  );
};

export default AuthRegister;
