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
      },
      Category,
      Difficulty,
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
        where: { userId: req.query.id },
        include: [User, Competence, Status],
      },
      Category,
      Difficulty,
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
      },
      Category,
      Difficulty,
    ],
  }).then((competence) => {
    return res.send(competence).status(200);
  });
};

exports.edit = (req, res) => {
  Competence.findByPk(req.body.id)
    .then((competence) => {
      competence.update({
        name: req.body.name,
        description: req.body.description,
        categoryId: req.body.category.id,
        difficultyId: req.body.difficulty.id,
      });
    })
    .then(() => {
      return res.send({ message: "Competence Updated!" }).status(200);
    });
};

exports.add = (req, res) => {
  Competence.create({
    name: req.body.name,
    description: req.body.description,
    categoryId: req.body.category.id,
    difficultyId: req.body.difficulty.id,
  }).then((response) => {
    console.log(response);
    return res.send({ message: "Competence Added!" }).status(200);
  });
};
