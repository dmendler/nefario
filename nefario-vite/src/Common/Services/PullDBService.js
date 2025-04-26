import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

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


// READ operation - get person by ID
export const getById = (id) => {
  const Person = Parse.Object.extend("rank_list");
  const query = new Parse.Query(Person);

  return query.get(id).then((result) => {
    // Return Person object with objectId: id
    return result;
  });
};

// READ operation - get all people in Parse class "rank_list"
// export const getAllPeople = () => {
//   const Person = Parse.Object.extend("rank_list");
//   const query = new Parse.Query(Person);

//   return query.find().then((results) => {
//     // Returns an array of Person objects
//     return results;
//   });
// };

// DELETE operation - remove person by ID
export const removePerson = (id) => {
  const Person = Parse.Object.extend("rank_list");
  const query = new Parse.Query(Person);

  return query.get(id).then((person) => {
    return person.destroy().then(() => {
      console.log(`Person with ID: ${id} deleted successfully`);
    });
  });
};

// Fetch all swimmers belonging to a specific rank
export const getAllSwimmersByRank = async (rankID) => {
  const rank = Parse.Object.extend("rank");
  const rankQuery = new Parse.Query(rank);
  rankQuery.equalTo("rankID", rankID); // Find rank by ID

  try {
    const rank = await rankQuery.first();
    if (!rank) {
      console.log("Rank not found");
      return [];
    }

    const swimmersRelation = rank.relation("swimmers"); // Get the relation field
    const swimmerQuery = swimmersRelation.query(); // Query related swimmers
    swimmerQuery.ascending(rank.get("sort_by")); // Sort dynamically by rank's sortBy field

    const swimmers = await swimmerQuery.find();
    return swimmers; // Return an array of Swimmer objects
  } catch (error) {
    console.error("Error fetching swimmers:", error);
    return [];
  }
};
