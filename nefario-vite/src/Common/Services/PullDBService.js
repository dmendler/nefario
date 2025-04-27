import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// Create
/* Create a new swimmer in the database */
export const createPerson = (formData) => {
  console.log("Creating competitor: ", formData);

  const Competitor = Parse.Object.extend("competitor");
  const competitor = new Competitor();

  // Set basic fields
  competitor.set("first_name", formData.first_name);
  competitor.set("last_name", formData.last_name);
  competitor.set("team_id", parseInt(formData.team_id));

  // Helper to parse times safely
  const safeParseFloat = (value) => value ? parseFloat(value) : undefined;

  competitor.set("fly_50_time", safeParseFloat(formData.fly_50_time));
  competitor.set("fly_100_time", safeParseFloat(formData.fly_100_time));
  competitor.set("fly_200_time", safeParseFloat(formData.fly_200_time));
  competitor.set("back_50_time", safeParseFloat(formData.back_50_time));
  competitor.set("back_100_time", safeParseFloat(formData.back_100_time));
  competitor.set("back_200_time", safeParseFloat(formData.back_200_time));
  competitor.set("breast_50_time", safeParseFloat(formData.breast_50_time));
  competitor.set("breast_100_time", safeParseFloat(formData.breast_100_time));
  competitor.set("breast_200_time", safeParseFloat(formData.breast_200_time));
  competitor.set("free_50_time", safeParseFloat(formData.free_50_time));
  competitor.set("free_100_time", safeParseFloat(formData.free_100_time));
  competitor.set("free_200_time", safeParseFloat(formData.free_200_time));
  competitor.set("free_500_time", safeParseFloat(formData.free_500_time));
  competitor.set("free_1000_time", safeParseFloat(formData.free_1000_time));
  competitor.set("free_1650_time", safeParseFloat(formData.free_1650_time));
  competitor.set("im_200_time", safeParseFloat(formData.im_200_time));

  // ACL
  const acl = new Parse.ACL();
  acl.setPublicReadAccess(true);
  acl.setPublicWriteAccess(true);      
  competitor.setACL(acl);
                                                                   
  return competitor.save();
};

// READ
/* Fetch all swimmers from the swimmer class */
export const getAllSwimmers = async () => {
  const Swimmer = Parse.Object.extend("competitor"); // or whatever your class name is
  const query = new Parse.Query(Swimmer);

  try {
    query.ascending("last_name"); // Optional: sort by last name
    const swimmers = await query.find();
    return swimmers;
  } catch (error) {
    console.error("Error fetching swimmers:", error);
    return [];
  }
};


// Update
/* Update a swimmer's details in the database */
export const updatePerson = async (formData) => {
  console.log("Updating swimmer: ", formData);

  const Competitor = Parse.Object.extend("competitor");
  const query = new Parse.Query(Competitor);
  query.equalTo("objectId", formData.objectId); // Find swimmer by ID

  try {
    const swimmer = await query.first();
    if (!swimmer) {
      console.log("Swimmer not found");
      return;
    }

    // Update fields
    swimmer.set("first_name", formData.first_name);
    swimmer.set("last_name", formData.last_name);
    swimmer.set("team_id", parseInt(formData.team_id));
    swimmer.set("fly_50_time", formData.fly_50_time);
    swimmer.set("fly_100_time", formData.fly_100_time);
    swimmer.set("fly_200_time", formData.fly_200_time);
    swimmer.set("back_50_time", formData.back_50_time);
    swimmer.set("back_100_time", formData.back_100_time);
    swimmer.set("back_200_time", formData.back_200_time);
    swimmer.set("breast_50_time", formData.breast_50_time);
    swimmer.set("breast_100_time", formData.breast_100_time);
    swimmer.set("breast_200_time", formData.breast_200_time);
    swimmer.set("free_50_time", formData.free_50_time);
    swimmer.set("free_100_time", formData.free_100_time);
    swimmer.set("free_200_time", formData.free_200_time);
    swimmer.set("free_500_time", formData.free_500_time);
    swimmer.set("free_1000_time", formData.free_1000_time);
    swimmer.set("free_1650_time", formData.free_1650_time);
    swimmer.set("im_200_time", formData.im_200_time);

    await swimmer.save(); // Save changes
  } catch (error) {
    console.error("Error updating swimmer:", error);
  }
};

// Delete
/* Delete a swimmer from the database */
export const deleteSwimmer = async (swimmerId) => {
  const Swimmer = Parse.Object.extend("competitor");
  const query = new Parse.Query(Swimmer);
  
  try {
    const swimmer = await query.get(swimmerId); // Actually fetch from server
    await swimmer.destroy(); // Now it's attached and can be deleted
    console.log("Swimmer deleted successfully");
  } catch (error) {
    console.error("Error deleting swimmer:", error);
  }
};

