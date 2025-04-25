import React, { useEffect, useState } from "react";
import { getAllSwimmersByRank } from "/src/Common/Services/PullDBService";
import MainForm from "./MainGet";

/* STATEFUL PARENT COMPONENT */
const MainList = () => {
  const [swimmers, setSwimmers] = useState([]);
  const [dataFetched, setDataFetched] = useState(false); // State to track if data has been fetched
  const rankID = "1"; // Change this dynamically if needed

  // Fetch swimmers from a specific rank
  const fetchSwimmers = () => {
    console.log("Fetching swimmers..."); // Debugging log
    getAllSwimmersByRank(rankID).then((swimmers) => {
      console.log("Swimmers received:", swimmers); // Debugging log
      setSwimmers(swimmers);
      setDataFetched(true); // Set dataFetched to true after fetching
    }).catch(error => console.error("Error fetching swimmers:", error));
  };

  const sortSwimmers = (sortBy) => {
    const sorted = [...swimmers].sort((a, b) => {
      if (sortBy === "first_name") return a.get("first_name").localeCompare(b.get("first_name"));
      if (sortBy === "last_name") return a.get("last_name").localeCompare(b.get("last_name"));
      if (sortBy === "time") return a.get("time") - b.get("time");
      return 0;
    });
    setSwimmers(sorted);
  };
  
  const clearSwimmers = () => {
    console.log("Clearing swimmers..."); // Debugging log
    setSwimmers([]);
    setDataFetched(false); // Reset dataFetched when clearing swimmers
  };

  return (
    <div>
      <hr />
      This is the main list parent component.
      <MainForm 
      onSort={sortSwimmers}
      onFetch={fetchSwimmers} 
      onClear={clearSwimmers}
      dataFetched={dataFetched}
      />
      {/* Swimmers List */}
      {swimmers.length > 0 && (
        <div>
            {swimmers.map((swimmer) => (
              <div key={swimmer.id}
              style={{
                border: "1px solid black",
                margin: "10px",
                padding: "10px 15px",
                minWidth: "200px",
                backgroundColor: "#f9f9f9",
                boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.1)",
              }}
              >
                <strong>{swimmer.get("first_name")} {swimmer.get("last_name")}</strong>
                <div>Time Free: {swimmer.get("time")}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MainList;