import React from "react";
import MainList from "./MainList";

/* MAIN MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const MainModule = () => {
  return (
    <section>
      <h1>Welcome to the Main Component</h1>
      This is the main module.
      <MainList />
    </section>
  );
};

export default MainModule;
