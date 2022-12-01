//import functions from Competence model
import {
  getCompetences,
  getCompetenceById,
  insertCompetence,
  updateCompetenceById,
  deleteCompetenceById,
} from "../models/competenceModel.js";

//get all competence
export const showCompetences = (req, res) => {
  getCompetences((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

//get single competence
export const showCompetenceById = (req, res) => {
  getCompetenceById(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

//create new competence
export const createCompetence = (req, res) => {
  const data = req.body;
  insertCompetence(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Update Competence
export const updateCompetence = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  updateCompetenceById(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Delete Competence
export const deleteCompetence = (req, res) => {
  const id = req.params.id;
  deleteCompetenceById(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};