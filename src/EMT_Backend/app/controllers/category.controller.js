const db = require("../models");
const Category = db.category;
const Competence = db.competence;
const Resource = db.resource;
const User_Competneces = db.user_competences;

exports.getAll = (req, res) => {
  Category.findAll({}).then((categories) => {
    return res.send(categories).status(200);
  });
};

exports.getById = (req, res) => {
  Category.findByPk(req.query.id).then((category) => {
    return res.send(category).status(200);
  });
};

exports.edit = (req, res) => {
  Category.findByPk(req.body.id)
    .then((category) => {
      category.update({
        name: req.body.name,
      });
    })
    .then((response) => {
      return res.send(response).status(200);
    });
};

exports.add = (req, res) => {
  Category.create({
    name: req.body.name,
  }).then((response) => {
    return res.send(response).status(200);
  });
};

exports.delete = (req, res) => {
  Category.findByPk(req.body.id, {
    include: [
      {
        model: Competence,
        include: [
          User_Competneces,
          Resource,
        ],
      },
    ],
  })
    .then((category) => {
      if (category.competences.length > 0) {
        category.competences.forEach((competence) => {
          competence.resources.forEach((resource) => {
            resource.destroy();
          });
          User_Competneces.destroy({where: {competenceId: competence.id}});
          competence.destroy();
        });
      }
      category.destroy().then((response) => {
        return res.send(response).status(200);
      });
    });
};
