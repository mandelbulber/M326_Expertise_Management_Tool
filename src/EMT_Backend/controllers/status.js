//import functions from Product model
import {
  getStatus,
  getStatusById,
  insertStatus,
  updateStatusById,
  deleteStatusById,
} from "../models/statusModel.js";

//get all status
export const showStatus = (req, res) => {
  getStatus((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

//get single status
export const showStatusById = (req, res) => {
  getStatusById(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

//create new status
export const createStatus = (req, res) => {
  const data = req.body;
  insertStatus(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Update status
export const updateStatus = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  updateStatusById(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Delete status
export const deleteStatus = (req, res) => {
  const id = req.params.id;
  deleteStatusById(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};