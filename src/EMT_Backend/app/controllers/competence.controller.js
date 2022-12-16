const db = require("../models");
const Competence = db.competence;
const Status = db.status;
const User = db.user;
const Category = db.category;
const Difficulty = db.difficulty;
const User_Competneces = db.user_competences;

exports.getAllByUser = (req, res) => {
  Competence.findAll({
    raw: true,
    nest: true,
    include: [
      {
        model: User_Competneces,
        include: [User, Competence, Status],
      }, Category, Difficulty
    ],
  }).then((competences) => {
    return res.send(competences).status(200);
  });
};

exports.getAllByUserId = (req, res) => {
  Competence.findAll({
    raw: true,
    nest: true,
    include: [
      {
        model: User_Competneces,
        where: {userId: req.query.id},
        include: [User, Competence, Status],
      }, Category, Difficulty
    ],
  }).then((competences) => {
    return res.send(competences).status(200);
  });
};

exports.getById = (req, res) => {
  Competence.findByPk(req.query.id, {
    raw: true,
    nest: true,
    include: [
      {
        model: User_Competneces,
        include: [User, Competence, Status],
      }, Category, Difficulty
    ],
  }).then((competence) => {
    return res.send(competence).status(200);
  });
};