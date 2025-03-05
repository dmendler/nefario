import React from "react";

/* STATELESS CHILD COMPONENT */
const MainForm = ({ onClick }) => {
  return (
    <div>
      <hr />
      This is the main form child component.
      <br />
      <button onClick={onClick}>Get Data</button>
    </div>
  );
};

export default MainForm;
