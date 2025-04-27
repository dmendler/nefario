import React, { useState } from "react";
import AddList from "./AddList";

const AddModule = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    team_id: "1",
    fly_50_time: "", fly_100_time: "", fly_200_time: "",
    back_50_time: "", back_100_time: "", back_200_time: "",
    breast_50_time: "", breast_100_time: "", breast_200_time: "",
    free_50_time: "", free_100_time: "", free_200_time: "",
    free_500_time: "", free_1000_time: "", free_1650_time: "",
    im_200_time: "",
  });

  return (
    <section className="indent">
      <h2>Add or Manage Swimmers</h2>
      <AddList formData={formData} setFormData={setFormData} />
    </section>
  );
};

export default AddModule;
