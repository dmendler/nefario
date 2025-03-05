import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

export const createPerson = (firstName, lastName, time5Free) => {
  console.log(
    "Creating: ",
    firstName,
    lastName,
    "with time_5_free: ",
    time5Free
  );
  const Person = Parse.Object.extend("rank_list");
  const person = new Person();

  // Set the fields
  person.set("first_name", firstName);
  person.set("last_name", lastName);
  person.set("time_5_free", time5Free); // Setting the time_5_free field

  // Setting ACL (Access Control List) for the record
  const acl = new Parse.ACL();
  acl.setPublicReadAccess(true);
  acl.setPublicWriteAccess(true);
  person.setACL(acl);
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
export const getAllPeople = () => {
  const Person = Parse.Object.extend("rank_list");
  const query = new Parse.Query(Person);

  return query.find().then((results) => {
    // Returns an array of Person objects
    return results;
  });
};

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
