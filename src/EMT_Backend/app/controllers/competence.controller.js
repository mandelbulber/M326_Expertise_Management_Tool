const db = require("../models");
const Competence = db.competence;

exports.all = (req, res) => {
    Competence.findAll().then(competence => {
        console.log(competence);
        res.send(competence).status(200);
    })
  };

  // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/