import React, { useState } from "react";
import { createPerson } from "../../Common/Services/PullDBService";

const AddSwimmer = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [time5Free, setTime5Free] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !time5Free) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await createPerson(firstName, lastName, time5Free);
      alert("Swimmer added successfully!");
      setFirstName("");
      setLastName("");
      setTime5Free("");
    } catch (error) {
      console.error("Error adding swimmer:", error);
      alert("Failed to add swimmer");
    }
  };

  return (
    <div>
      <h2>Add a New Swimmer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="5 Free Time"
          value={time5Free}
          onChange={(e) => setTime5Free(e.target.value)}
          required
        />
        <button type="submit">Add Swimmer</button>
      </form>
    </div>
  );
};

export default AddSwimmer;
