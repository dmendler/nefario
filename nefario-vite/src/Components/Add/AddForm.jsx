import React from "react";

const AddForm = ({ formData, setFormData, handleChange, handleSubmit, isEditing }) => {
  return (
    <form onSubmit={handleSubmit} className="indent">
      {/* First Name and Last Name */}
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

      {/* Fly Times */}
      <h4>Fly Times</h4>
      <input name="fly_50_time" placeholder="50 Fly Time" value={formData.fly_50_time} onChange={(e) => handleChange(e, formData, setFormData)} />
      <input name="fly_100_time" placeholder="100 Fly Time" value={formData.fly_100_time} onChange={(e) => handleChange(e, formData, setFormData)} />
      <input name="fly_200_time" placeholder="200 Fly Time" value={formData.fly_200_time} onChange={(e) => handleChange(e, formData, setFormData)} />

      {/* Backstroke Times */}
      <h4>Backstroke Times</h4>
      <input name="back_50_time" placeholder="50 Back Time" value={formData.back_50_time} onChange={(e) => handleChange(e, formData, setFormData)} />
      <input name="back_100_time" placeholder="100 Back Time" value={formData.back_100_time} onChange={(e) => handleChange(e, formData, setFormData)} />
      <input name="back_200_time" placeholder="200 Back Time" value={formData.back_200_time} onChange={(e) => handleChange(e, formData, setFormData)} />

      {/* Breaststroke Times */}
      <h4>Breaststroke Times</h4>
      <input name="breast_50_time" placeholder="50 Breast Time" value={formData.breast_50_time} onChange={(e) => handleChange(e, formData, setFormData)} />
      <input name="breast_100_time" placeholder="100 Breast Time" value={formData.breast_100_time} onChange={(e) => handleChange(e, formData, setFormData)} />
      <input name="breast_200_time" placeholder="200 Breast Time" value={formData.breast_200_time} onChange={(e) => handleChange(e, formData, setFormData)} />

      {/* Freestyle Times */}
      <h4>Freestyle Times</h4>
      <input name="free_50_time" placeholder="50 Free Time" value={formData.free_50_time} onChange={(e) => handleChange(e, formData, setFormData)} />
      <input name="free_100_time" placeholder="100 Free Time" value={formData.free_100_time} onChange={(e) => handleChange(e, formData, setFormData)} />
      <input name="free_200_time" placeholder="200 Free Time" value={formData.free_200_time} onChange={(e) => handleChange(e, formData, setFormData)} />
      <input name="free_500_time" placeholder="500 Free Time" value={formData.free_500_time} onChange={(e) => handleChange(e, formData, setFormData)} />
      <input name="free_1000_time" placeholder="1000 Free Time" value={formData.free_1000_time} onChange={(e) => handleChange(e, formData, setFormData)} />
      <input name="free_1650_time" placeholder="1650 Free Time" value={formData.free_1650_time} onChange={(e) => handleChange(e, formData, setFormData)} />

      {/* Individual Medley */}
      <h4>Individual Medley</h4>
      <input name="im_200_time" placeholder="200 IM Time" value={formData.im_200_time} onChange={(e) => handleChange(e, formData, setFormData)} />

      {/* Submit Button */}
      <br />
      <button
        type="submit"
        className="btn btn-success btn-sm"
        style={{ marginTop: "10px" }}
      >
        {isEditing ? "Update Swimmer" : "Add Swimmer"}
      </button>
    </form>
  );
};

export default AddForm;
