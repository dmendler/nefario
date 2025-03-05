import React, { useEffect, useState } from "react";
import {
  createPerson,
  getById,
  getAllPeople,
  removePerson,
} from "/src/Common/Services/PullDBService";
import MainForm from "./MainGet";

/* STATEFUL PARENT COMPONENT */
const MainList = () => {
  // Variables in the state to hold data
  const [people, setPeople] = useState([]);

  // Handler to fetch people from the database when the button is clicked
  const fetchPeople = () => {
    getAllPeople().then((people) => {
      console.log(people);
      setPeople(people); // Update the state with the fetched people data
    });
  };

  return (
    <div>
      <hr />
      This is the main list parent component.
      <MainForm onClick={fetchPeople} />{" "}
      {/* Passing the fetchPeople function to the child */}
      {people.length > 0 && (
        <div>
          <ul>
            {people.map((person) => (
              <div key={person.id}>
                <span>
                  {/* Display first and last names */}
                  <li>
                    {person.get("first_name")} {person.get("last_name")}
                  </li>
                  {/* Display time_5_free */}
                  <li>Time Free: {person.get("time_5_free")}</li>
                  {/* Button to remove person from the list */}
                  <button
                    onClick={() => {
                      // Handle remove logic
                      setPeople(people.filter((p) => p.id !== person.id));
                    }}
                  >
                    Delete
                  </button>
                </span>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MainList;
