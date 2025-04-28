import React, { useState, useEffect } from "react";
import { getAllSwimmers } from "../../Common/Services/PullDBService";
import { handleSubmit, handleChange, handleDelete, handleEdit } from "../../Common/Services/AddService";
import AddForm from "./AddForm";

const AddList = ({ formData, setFormData }) => {
  const [swimmers, setSwimmers] = useState([]);
  const [selectedSwimmer, setSelectedSwimmer] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editSwimmerId, setEditSwimmerId] = useState(null);

  const fetchSwimmers = async () => {
    const data = await getAllSwimmers();
    setSwimmers(data);
  };

  useEffect(() => {
    fetchSwimmers();
  }, []);

  return (
    <>
      <AddForm
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        handleSubmit={(e) => handleSubmit(e, formData, setFormData, isEditing, editSwimmerId, setIsEditing, setEditSwimmerId, fetchSwimmers)}
        isEditing={isEditing}
      />
      
      <hr />
      <div className="indent">
        <h4>Manage Swimmers</h4>
        <select
          className="form-select mb-3"
          value={selectedSwimmer}
          onChange={(e) => setSelectedSwimmer(e.target.value)}
        >
          <option value="" disabled>Select a swimmer</option>
          {swimmers.map((swimmer) => (
            <option key={swimmer.id || swimmer.get("objectId")} value={swimmer.id || swimmer.get("objectId")}>
              {swimmer.get("first_name")} {swimmer.get("last_name")}
            </option>
          ))}
        </select>

        <button
          className="btn btn-danger"
          onClick={() => handleDelete(selectedSwimmer, fetchSwimmers, setSelectedSwimmer, setIsEditing, setEditSwimmerId)}
          disabled={!selectedSwimmer}
        >
          Delete Swimmer
        </button>

        <button
          className="btn btn-primary ms-2"
          onClick={() => handleEdit(selectedSwimmer, swimmers, setFormData, setIsEditing, setEditSwimmerId)}
          disabled={!selectedSwimmer}
        >
          Edit Swimmer
        </button>
      </div>
    </>
  );
};

export default AddList;
