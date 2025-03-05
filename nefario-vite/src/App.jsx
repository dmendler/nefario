import React from "react";
import Components from "./Components/Components.js";
//import * as Env from "./environments.js";
import Parse from "parse";

const Env = {
  APPLICATION_ID: "hghyojbRy20HCekyMqxeTtA1dE1jVshTRp4uCeXD",
  JAVASCRIPT_KEY: "KJgNuLJxlz9rUdtkMIbAOovxdXGOHkuIP3wxracO",
  SERVER_URL: "https://parseapi.back4app.com"
}

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  return <Components />;
}

export default App;
