import React, { useState, useEffect } from "react";
import {
  createPerson,
  deleteSwimmer,
  getAllSwimmers,
  updatePerson,
} from "../../Common/Services/PullDBService";
import { parseTimeInput } from "../../Common/Services/ScoreService";
import {handleChange, handleSubmit, handleDelete, handleEdit} from "../../Common/Services/AddService";

/* Not just add, but also update and delete*/
const AddSwimmer = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    team_id: "1", // change if adding teams
    fly_50_time: "",
    fly_100_time: "",
    fly_200_time: "",
    back_50_time: "",
    back_100_time: "",
    back_200_time: "",
    breast_50_time: "",
    breast_100_time: "",
    breast_200_time: "",
    free_50_time: "",
    free_100_time: "",
    free_200_time: "",
    free_500_time: "",
    free_1000_time: "",
    free_1650_time: "",
    im_200_time: "",
  });

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
    <div>
      <h2 className="indent">
        {isEditing ? "Edit Swimmer" : "Add a New Swimmer"}
      </h2>
      <form onSubmit={(e) => handleSubmit(e, formData, setFormData, isEditing, editSwimmerId, setIsEditing, setEditSwimmerId, fetchSwimmers)} className="indent">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={(e) => handleChange(e, formData, setFormData)}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={(e) => handleChange(e, formData, setFormData)}
          required
        />
        {/* Input fields grouped by stroke */}
        <h4>Fly Times</h4>
        <input
          name="fly_50_time"
          placeholder="50 Fly Time"
          value={formData.fly_50_time}
          onChange={(e) => handleChange(e, formData, setFormData)}
        />
        <input
          name="fly_100_time"
          placeholder="100 Fly Time"
          value={formData.fly_100_time}
          onChange={(e) => handleChange(e, formData, setFormData)}
        />
        <input
          name="fly_200_time"
          placeholder="200 Fly Time"
          value={formData.fly_200_time}
          onChange={(e) => handleChange(e, formData, setFormData)}
        />

        <h4>Backstroke Times</h4>
        <input
          name="back_50_time"
          placeholder="50 Back Time"
          value={formData.back_50_time}
          onChange={(e) => handleChange(e, formData, setFormData)}
        />
        <input
          name="back_100_time"
          placeholder="100 Back Time"
          value={formData.back_100_time}
          onChange={(e) => handleChange(e, formData, setFormData)}
        />
        <input
          name="back_200_time"
          placeholder="200 Back Time"
          value={formData.back_200_time}
          onChange={(e) => handleChange(e, formData, setFormData)}
        />

        <h4>Breaststroke Times</h4>
        <input
          name="breast_50_time"
          placeholder="50 Breast Time"
          value={formData.breast_50_time}
          onChange={(e) => handleChange(e, formData, setFormData)}
        />
        <input
          name="breast_100_time"
          placeholder="100 Breast Time"
          value={formData.breast_100_time}
          onChange={(e) => handleChange(e, formData, setFormData)}
        />
        <input
          name="breast_200_time"
          placeholder="200 Breast Time"
          value={formData.breast_200_time}
          onChange={(e) => handleChange(e, formData, setFormData)}
        />

        <h4>Freestyle Times</h4>
        <input
          name="free_50_time"
          placeholder="50 Free Time"
          value={formData.free_50_time}
          onChange={(e) => handleChange(e, formData, setFormData)}
        />
        <input
          name="free_100_time"
          placeholder="100 Free Time"
          value={formData.free_100_time}
          onChange={(e) => handleChange(e, formData, setFormData)}
        />
        <input
          name="free_200_time"
          placeholder="200 Free Time"
          value={formData.free_200_time}
          onChange={(e) => handleChange(e, formData, setFormData)}
        />
        <input
          name="free_500_time"
          placeholder="500 Free Time"
          value={formData.free_500_time}
          onChange={(e) => handleChange(e, formData, setFormData)}
        />
        <input
          name="free_1000_time"
          placeholder="1000 Free Time"
          value={formData.free_1000_time}
          onChange={(e) => handleChange(e, formData, setFormData)}
        />
        <input
          name="free_1650_time"
          placeholder="1650 Free Time"
          value={formData.free_1650_time}
          onChange={(e) => handleChange(e, formData, setFormData)}
        />

        <h4>Individual Medley</h4>
        <input
          name="im_200_time"
          placeholder="200 IM Time"
          value={formData.im_200_time}
          onChange={(e) => handleChange(e, formData, setFormData)}
        />

        <br />
        <button
          type="submit"
          className="btn btn-success btn-sm"
          style={{ marginTop: "10px" }}
        >
          {isEditing ? "Update Swimmer" : "Add Swimmer"}
        </button>
      </form>
      <hr />
      <div class="indent">
        <h4>Manage Swimmers</h4>
        <select
          class="form-select mb-3"
          value={selectedSwimmer}
          onChange={(e) => setSelectedSwimmer(e.target.value)}
        >
          <option value="" disabled>Select a swimmer</option>
          {swimmers.map((swimmer) => (
            <option
              key={swimmer.id || swimmer.get("objectId")}
              value={swimmer.id || swimmer.get("objectId")}
            >
              {swimmer.get("first_name")} {swimmer.get("last_name")}
            </option>
          ))}
        </select>

        <button
          class="btn btn-danger"
          onClick={() => handleDelete(selectedSwimmer, () => fetchSwimmers(setSwimmers), setSelectedSwimmer, setIsEditing, setEditSwimmerId)}
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
    </div>
  );
};

export default AddSwimmer;
