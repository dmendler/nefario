import React from "react";

/* STATELESS CHILD COMPONENT */
const MainForm = ({ onSort, onFetch, onClear, dataFetched }) => {
  return (
    <center>
      <div style={{ marginBottom: "20px" }}>
        {/* Toggle between Fetch and Clear buttons */}
        {!dataFetched ? (
          <button class="btn btn-success btn-lg m-2" onClick={onFetch}>
            Fetch Swimmers
          </button>
        ) : (
          <button class="btn btn-danger btn-lg m-2" onClick={onClear}>
            Clear Swimmers
          </button>
        )}
        {/* Sort buttons */}
        {dataFetched && (
          <div>
          <button
            class="btn btn-primary btn-sm m-2"
            onClick={() => onSort("first_name")}
          >
            Sort by First Name
          </button>
          <button
            class="btn btn-primary btn-sm m-2"
            onClick={() => onSort("last_name")}
          >
            Sort by Last Name
          </button>
          <button
            class="btn btn-primary btn-sm m-2"
            onClick={() => onSort("time")}
          >
            Sort by Time
          </button>
          </div>
        )}
      </div>
    </center>
  );
};

export default MainForm;
