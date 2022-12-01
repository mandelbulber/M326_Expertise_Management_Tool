//import connection 
import db from "../config/database.js";

//get all resources 
export const getResources = (result) => {
  db.query("SELECT * FROM Resource", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    }
    else {
      result(null, results);
    }
  });
};

//get single resource
export const getResourceById = (id, result) => {
  db.query(
    "SELECT * FROM Resource WHERE resourceId = ?",
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

//insert resource to databased
export const insertResource = (data, result) => {
  db.query("INSERT INTO Resource SET ?", [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

// Update resource to Database
export const updateResourceById = (data, id, result) => {
  db.query(
    "UPDATE Resource SET fk_competenceId = ?, url = ? WHERE resourceId = ?",
    [data.fk_competenceId, data.url, id],
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

// Delete resource from Database
export const deleteResourceById = (id, result) => {
  db.query("DELETE FROM Resource WHERE resourceId = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};