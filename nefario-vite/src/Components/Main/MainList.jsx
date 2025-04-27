import React, { useEffect, useState } from "react";
import { getAllSwimmers } from "/src/Common/Services/PullDBService";
import MainForm from "./MainGet";

/* STATEFUL PARENT COMPONENT */
const MainList = () => {
  const [swimmers, setSwimmers] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [sortField, setSortField] = useState(""); // NEW: track sort field

  const fetchSwimmers = () => {
    console.log("Fetching swimmers...");
    getAllSwimmers()
      .then((swimmers) => {
        console.log("Swimmers received:", swimmers);
        setSwimmers(swimmers);
        setDataFetched(true);
      })
      .catch((error) => console.error("Error fetching swimmers:", error));
  };

  const sortSwimmers = (sortBy) => {
    const sorted = [...swimmers].sort((a, b) => {
      if (sortBy === "first_name" || sortBy === "last_name") {
        return a.get(sortBy).localeCompare(b.get(sortBy));
      }
      // Time fields
      return (a.get(sortBy) || Infinity) - (b.get(sortBy) || Infinity);
    });
    setSwimmers(sorted);
  };
  

  const clearSwimmers = () => {
    console.log("Clearing swimmers...");
    setSwimmers([]);
    setDataFetched(false);
    setSortField("");
  };

  return (
    <div>
      <hr />
      <p class="indent">Here you can fetch the swimmers from the database:</p>

      <MainForm 
        onSort={sortSwimmers}
        onFetch={fetchSwimmers}
        onClear={clearSwimmers}
        dataFetched={dataFetched}
        sortField={sortField}
        setSortField={setSortField}
      />

      {/* Swimmers List */}
      {swimmers.map((swimmer) => (
          <div
            key={swimmer.id}
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
            
            {/* What time to show */}
            <div>
              {sortField === "first_name" || sortField === "last_name" ? (
                <>
                  100 FREE TIME: {swimmer.get("free_100_time") || "N/A"}
                </>
              ) : (
                <>
                  {sortField.replace(/_/g, ' ').toUpperCase()}: {swimmer.get(sortField) || "N/A"}
                </>
              )}
            </div>
          </div>
        ))}

    </div>
  );
};

export default MainList;
