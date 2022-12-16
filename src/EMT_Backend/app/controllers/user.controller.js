const db = require("../models");
const User = db.user;
const Role = db.role;

exports.home = (req, res) => {
  res.status(200).send("Home Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.getAllUsers = (req, res) => {
  User.findAll({
    raw: true,
    nest: true,
  }).then((users) => {
    return res.send(users).status(200);
  });
};