const db = require("../models");
const Competence = db.competence;
const Status = db.status;
const User = db.user;
const CompetenceCategory = db.competencecategory;

exports.getAllByUser = (req, res) => {
  Competence.findAll(
    { 
      where: {userId: req.userId},
      raw: true, 
      nest: true,
      include: [Status, User, CompetenceCategory]
    }).then((competences) => {
    return res.send(competences).status(200);
  });
};

// https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
