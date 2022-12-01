//import functions from Product model
import {
  getUsers,
  getUserById,
  insertUser,
  updateUserById,
  deleteUserById,
} from "../models/userModel.js";

//get all user
export const showUsers = (req, res) => {
  getUsers((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

//get single user
export const showUserById = (req, res) => {
  getUserById(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

//create new user
export const createUser = (req, res) => {
  const data = req.body;
  insertUser(data, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Update User
export const updateUser = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  updateUserById(data, id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Delete User
export const deleteUser = (req, res) => {
  const id = req.params.id;
  deleteUserById(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};