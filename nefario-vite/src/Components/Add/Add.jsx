import React, { useState, useEffect } from "react";
import {
  createPerson,
  deleteSwimmer,
  getAllSwimmers,
  updatePerson,
} from "../../Common/Services/PullDBService";

const AddSwimmer = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    team_id: "1",
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

  const parseTimeInput = (input) => {
    if (typeof input !== "string") return NaN;
    input = input.trim();
    if (input.includes(":")) {
      const [minutes, seconds] = input.split(":");
      return parseInt(minutes, 10) * 60 + parseFloat(seconds);
    } else {
      return parseFloat(input);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.first_name || !formData.last_name || !formData.team_id) {
      alert("First name, last name, and team ID are required.");
      return;
    }

    const cleanedFormData = { ...formData };
    for (const key in cleanedFormData) {
      if (key.endsWith("_time") && cleanedFormData[key]) {
        const parsed = parseTimeInput(cleanedFormData[key]);
        if (!isNaN(parsed)) {
          cleanedFormData[key] = parsed;
        }
      }
    }

    try {
      if (isEditing && editSwimmerId) {
        await updatePerson({ ...cleanedFormData, objectId: editSwimmerId });
        alert("Swimmer updated successfully!");
      } else {
        await createPerson(cleanedFormData);
        alert("Swimmer added successfully!");
      }

      setFormData({
        first_name: "",
        last_name: "",
        team_id: "1",
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
      setIsEditing(false);
      setEditSwimmerId(null);
      await fetchSwimmers();
    } catch (error) {
      console.error("Error adding/updating swimmer:", error);
      alert("Failed to add/update swimmer.");
    }
  };

  const fetchSwimmers = async () => {
    const data = await getAllSwimmers();
    setSwimmers(data);
  };

  const handleDelete = async () => {
    if (!selectedSwimmer) return;

    console.log("Trying to delete swimmer with id:", selectedSwimmer);
    await deleteSwimmer(selectedSwimmer);
    await fetchSwimmers();
    setSelectedSwimmer("");
    setIsEditing(false);
    setEditSwimmerId(null);
  };

  const handleEdit = async () => {
    if (!selectedSwimmer) return;

    const swimmer = swimmers.find(
      (s) => (s.id || s.get("objectId")) === selectedSwimmer
    );
    if (!swimmer) return;

    setFormData({
      first_name: swimmer.get("first_name") || "",
      last_name: swimmer.get("last_name") || "",
      team_id: swimmer.get("team_id")?.toString() || "1",
      fly_50_time: swimmer.get("fly_50_time") || "",
      fly_100_time: swimmer.get("fly_100_time") || "",
      fly_200_time: swimmer.get("fly_200_time") || "",
      back_50_time: swimmer.get("back_50_time") || "",
      back_100_time: swimmer.get("back_100_time") || "",
      back_200_time: swimmer.get("back_200_time") || "",
      breast_50_time: swimmer.get("breast_50_time") || "",
      breast_100_time: swimmer.get("breast_100_time") || "",
      breast_200_time: swimmer.get("breast_200_time") || "",
      free_50_time: swimmer.get("free_50_time") || "",
      free_100_time: swimmer.get("free_100_time") || "",
      free_200_time: swimmer.get("free_200_time") || "",
      free_500_time: swimmer.get("free_500_time") || "",
      free_1000_time: swimmer.get("free_1000_time") || "",
      free_1650_time: swimmer.get("free_1650_time") || "",
      im_200_time: swimmer.get("im_200_time") || "",
    });

    setIsEditing(true);
    setEditSwimmerId(swimmer.id || swimmer.get("objectId"));
  };

  useEffect(() => {
    fetchSwimmers();
  }, []);

  return (
    <div>
      <h2 className="indent">
        {isEditing ? "Edit Swimmer" : "Add a New Swimmer"}
      </h2>
      <form onSubmit={handleSubmit} className="indent">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        {/* Input fields grouped by stroke */}
        <h4>Fly Times</h4>
        <input
          name="fly_50_time"
          placeholder="50 Fly Time"
          value={formData.fly_50_time}
          onChange={handleChange}
        />
        <input
          name="fly_100_time"
          placeholder="100 Fly Time"
          value={formData.fly_100_time}
          onChange={handleChange}
        />
        <input
          name="fly_200_time"
          placeholder="200 Fly Time"
          value={formData.fly_200_time}
          onChange={handleChange}
        />

        <h4>Backstroke Times</h4>
        <input
          name="back_50_time"
          placeholder="50 Back Time"
          value={formData.back_50_time}
          onChange={handleChange}
        />
        <input
          name="back_100_time"
          placeholder="100 Back Time"
          value={formData.back_100_time}
          onChange={handleChange}
        />
        <input
          name="back_200_time"
          placeholder="200 Back Time"
          value={formData.back_200_time}
          onChange={handleChange}
        />

        <h4>Breaststroke Times</h4>
        <input
          name="breast_50_time"
          placeholder="50 Breast Time"
          value={formData.breast_50_time}
          onChange={handleChange}
        />
        <input
          name="breast_100_time"
          placeholder="100 Breast Time"
          value={formData.breast_100_time}
          onChange={handleChange}
        />
        <input
          name="breast_200_time"
          placeholder="200 Breast Time"
          value={formData.breast_200_time}
          onChange={handleChange}
        />

        <h4>Freestyle Times</h4>
        <input
          name="free_50_time"
          placeholder="50 Free Time"
          value={formData.free_50_time}
          onChange={handleChange}
        />
        <input
          name="free_100_time"
          placeholder="100 Free Time"
          value={formData.free_100_time}
          onChange={handleChange}
        />
        <input
          name="free_200_time"
          placeholder="200 Free Time"
          value={formData.free_200_time}
          onChange={handleChange}
        />
        <input
          name="free_500_time"
          placeholder="500 Free Time"
          value={formData.free_500_time}
          onChange={handleChange}
        />
        <input
          name="free_1000_time"
          placeholder="1000 Free Time"
          value={formData.free_1000_time}
          onChange={handleChange}
        />
        <input
          name="free_1650_time"
          placeholder="1650 Free Time"
          value={formData.free_1650_time}
          onChange={handleChange}
        />

        <h4>Individual Medley</h4>
        <input
          name="im_200_time"
          placeholder="200 IM Time"
          value={formData.im_200_time}
          onChange={handleChange}
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

      <div className="mt-4">
        <h4>Manage Swimmers</h4>
        <select
          className="form-select mb-3"
          value={selectedSwimmer}
          onChange={(e) => setSelectedSwimmer(e.target.value)}
        >
          <option value="">Select a swimmer</option>
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
          className="btn btn-danger"
          onClick={handleDelete}
          disabled={!selectedSwimmer}
        >
          Delete Swimmer
        </button>

        <button
          className="btn btn-primary ms-2"
          onClick={handleEdit}
          disabled={!selectedSwimmer}
        >
          Edit Swimmer
        </button>
      </div>
    </div>
  );
};

export default AddSwimmer;
