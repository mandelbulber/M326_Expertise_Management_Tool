//import connection 
import db from "../config/database.js";

//get all competences 
export const getCompetences = (result) => {
    db.query("SELECT * FROM Competence", (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        }
        else {
            result(null, results);
        }
    });
};

//get single competence
export const getCompetenceById = (id, result) => {
    db.query(
        "SELECT * FROM Competence WHERE competenceId = ?",
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

//insert competence to databased
export const insertCompetence = (data, result) => {
    db.query("INSERT INTO Competence SET ?", [data], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

// Update competence to Database
export const updateCompetenceById = (data, id, result) => {
    db.query(
        "UPDATE Competence SET fk_statusId = ?, fk_userId = ?, name = ?, description = ? WHERE competenceId = ?",
        [data.fk_statusId, data.fk_userId, data.name, data.description, id],
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

// Delete competence from Database
export const deleteCompetenceById = (id, result) => {
    db.query("DELETE FROM Competence WHERE competenceId = ?", [id], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};