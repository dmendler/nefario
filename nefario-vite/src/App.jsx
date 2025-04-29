import React from "react";
import Components from "./Components/Components.jsx";
import Parse from "parse";
import { useState, useEffect } from "react";
import { authenticateUser, logoutUser } from "./Components/Auth/AuthService";
import "./styles.css";
import getEnv from "./environments.js";

const Env = getEnv();
Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authenticateUser());
  useEffect(() => {
    Parse.User.currentAsync().then((user) => {
      setIsLoggedIn(!!user);
    });
}, []);
  return (
    <div className="App">
      <Components isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>;
    </div>
  );}

export default App;
