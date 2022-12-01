//import connection 
import db from "../config/database.js";

//get all status  
export const getStatus = (result) => {
  db.query("SELECT * FROM Status", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    }
    else {
      result(null, results);
    }
  });
};

//get single status 
export const getStatusById = (id, result) => {
  db.query(
    "SELECT * FROM Status WHERE userId = ?",
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

//insert status to databased
export const insertStatus = (data, result) => {
  db.query("INSERT INTO Status SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

// Update status to Database
export const updateStatusById = (data, id, result) => {
  db.query(
    "UPDATE User SET name = ? WHERE statusId = ?",
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

// Delete status from Database
export const deleteStatusById = (id, result) => {
  db.query("DELETE FROM User WHERE userId = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};