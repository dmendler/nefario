import React from "react";

/* STATELESS CHILD COMPONENT */
const MainForm = ({ onSort, onFetch, onClear, dataFetched, sortField, setSortField }) => {
  const handleSortChange = (e) => {
    const selected = e.target.value;
    setSortField(selected);
    onSort(selected);
  };

  return (
    <center>
      <div style={{ marginBottom: "20px" }}>
        {!dataFetched ? (
          <button className="btn btn-success btn-lg m-2" onClick={onFetch}>
            Fetch Swimmers
          </button>
        ) : (
          <button className="btn btn-danger btn-lg m-2" onClick={onClear}>
            Clear Swimmers
          </button>
        )}

        {dataFetched && (
          <div>
            <select 
              className="form-select m-2" 
              style={{ width: "250px", display: "inline-block" }}
              value={sortField}
              onChange={handleSortChange}
            >
              <option value="" disabled>Select Sort Option</option>
              <option value="first_name">First Name</option>
              <option value="last_name">Last Name</option>
              <option value="fly_50_time">50 Fly Time</option>
              <option value="fly_100_time">100 Fly Time</option>
              <option value="fly_200_time">200 Fly Time</option>
              <option value="back_50_time">50 Back Time</option>
              <option value="back_100_time">100 Back Time</option>
              <option value="back_200_time">200 Back Time</option>
              <option value="breast_50_time">50 Breast Time</option>
              <option value="breast_100_time">100 Breast Time</option>
              <option value="breast_200_time">200 Breast Time</option>
              <option value="free_50_time">50 Free Time</option>
              <option value="free_100_time">100 Free Time</option>
              <option value="free_200_time">200 Free Time</option>
              <option value="free_500_time">500 Free Time</option>
              <option value="free_1000_time">1000 Free Time</option>
              <option value="free_1650_time">1650 Free Time</option>
              <option value="im_200_time">200 IM Time</option>
            </select>
          </div>
        )}
      </div>
    </center>
  );
};

export default MainForm;
