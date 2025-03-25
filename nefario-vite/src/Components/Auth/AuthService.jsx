import Parse from "parse";

export const createUser = (newUser) => {
  const user = new Parse.User();

  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  console.log("User: ", user);

  return user
    .signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

export const authenticateUser = ({ email, password }) => {
  return Parse.User.logIn(email, password)
    .then((user) => {
      console.log("User logged in:", user);
      return user;
    })
    .catch((error) => {
      alert(`Login failed: ${error.message}`);
      return null;
    });
};
