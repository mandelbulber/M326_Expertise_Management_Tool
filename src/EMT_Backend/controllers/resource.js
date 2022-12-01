//import functions from Product model
import {
  getResources,
  getResourceById,
  insertResource,
  updateResourceById,
  deleteResourceById,
} from "../models/resourceModel.js";

//get all resource
export const showResources = (req, res) => {
  getResources((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

//get single resource
export const showResourceById = (req, res) => {
  getResourceById(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

//create new resource
export const createResource = (req, res) => {
  const data = req.body;
  insertResource(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Update resource
export const updateResource = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  updateResourceById(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Delete resource
export const deleteResource = (req, res) => {
  const id = req.params.id;
  deleteResourceById(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};