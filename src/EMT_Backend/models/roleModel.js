//import connection 
import db from "../config/database.js";

//get all roles 
export const getRoles = (result) => {
  db.query("SELECT * FROM Role", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    }
    else {
      result(null, results);
    }
  });
};

//get single role
export const getRoleById = (id, result) => {
  db.query(
    "SELECT * FROM Role WHERE roleId = ?",
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

//insert role to databased
export const insertRole = (data, result) => {
  db.query("INSERT INTO Role SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

// Update role to Database
export const updateRoleById = (data, id, result) => {
  db.query(
    "UPDATE Role SET name = ? WHERE roleId = ?",
    [data.name, id],
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

// Delete role from Database
export const deleteRoleById = (id, result) => {
  db.query("DELETE FROM Role WHERE roleId = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};