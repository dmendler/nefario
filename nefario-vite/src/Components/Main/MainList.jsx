import React, { useEffect, useState } from "react";
import { getAllSwimmersByRank } from "/src/Common/Services/PullDBService";
import MainForm from "./MainGet";

/* STATEFUL PARENT COMPONENT */
const MainList = () => {
  const [swimmers, setSwimmers] = useState([]);
  const rankID = "1"; // Change this dynamically if needed

  // Fetch swimmers from a specific rank
  const fetchSwimmers = () => {
    console.log("Fetching swimmers..."); // Debugging log
    getAllSwimmersByRank(rankID).then((swimmers) => {
      console.log("Swimmers received:", swimmers); // Debugging log
      setSwimmers(swimmers);
    }).catch(error => console.error("Error fetching swimmers:", error));
};

  return (
    <div>
      <hr />
      This is the main list parent component.
      <MainForm onClick={fetchSwimmers} /> {/* Fetch swimmers on button click */}
      {swimmers.length > 0 && (
        <div>
          <ul>
            {swimmers.map((swimmer) => (
              <div key={swimmer.id}>
                <span>
                  {/* Display swimmer's first and last name */}
                  <li>
                    {swimmer.get("first_name")} {swimmer.get("last_name")}
                  </li>
                  {/* Display time_5_free */}
                  <li>Time Free: {swimmer.get("time")}</li>
                  {/* Button to remove swimmer */}
                  <button
                    onClick={() => {
                      setSwimmers(swimmers.filter((s) => s.id !== swimmer.id));
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
