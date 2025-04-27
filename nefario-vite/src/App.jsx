import React from "react";
import Components from "./Components/Components.jsx";
//import * as Env from "./environments.js";
import Parse from "parse";
import { useState, useEffect } from "react";
import { authenticateUser, logoutUser } from "./Components/Auth/AuthService";
import "./styles.css";

// This will be replace with above import
const Env = {
  APPLICATION_ID: "hghyojbRy20HCekyMqxeTtA1dE1jVshTRp4uCeXD",
  JAVASCRIPT_KEY: "KJgNuLJxlz9rUdtkMIbAOovxdXGOHkuIP3wxracO",
  SERVER_URL: "https://parseapi.back4app.com"
}

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
