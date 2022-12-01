//import connection 
import db from "../config/database.js";

//get all users 
export const getUsers = (result) => {
  db.query("SELECT * FROM User", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    }
    else {
      result(null, results);
    }
  });
};

//get single user
export const getUserById = (id, result) => {
  db.query(
    "SELECT * FROM User WHERE userId = ?",
    [id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results[0]);
      }
    }
  );
};

//insert user to databased
export const insertUser = (data, result) => {
  db.query("INSERT INTO User SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

// Update user to Database
export const updateUserById = (data, id, result) => {
  db.query(
    "UPDATE User SET fk_roleId = ?, email = ?, password = ?, firstname = ?, lastname = ? WHERE userId = ?",
    [data.fk_roleId, data.email, data.password, data.firstname, data.lastname, id],
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

// Delete user from Database
export const deleteUserById = (id, result) => {
  db.query("DELETE FROM User WHERE userId = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};