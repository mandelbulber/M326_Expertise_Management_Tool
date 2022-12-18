const db = require("../models");
const Competence = db.competence;
const Status = db.status;
const User = db.user;
const Category = db.category;
const Difficulty = db.difficulty;
const User_Competneces = db.user_competences;
const Resource = db.resource;

exports.getAll = (req, res) => {
  Competence.findAll({
    include: [
      {
        model: User_Competneces,
        include: [User, Competence, Status],
      },
      Category,
      Difficulty,
      Resource,
    ],
  }).then((competences) => {
    return res.send(competences).status(200);
  });
};

exports.getAllByUserId = (req, res) => {
  Competence.findAll({
    include: [
      {
        model: User_Competneces,
        where: { userId: req.query.id },
        include: [User, Competence, Status],
      },
      Category,
      Difficulty,
      Resource,
    ],
  }).then((competences) => {
    return res.send(competences).status(200);
  });
};

exports.getById = (req, res) => {
  Competence.findByPk(req.query.id, {
    include: [
      {
        model: User_Competneces,
        include: [User, Competence, Status],
      },
      Category,
      Difficulty,
      Resource,
    ],
  }).then((competence) => {
    return res.send(competence).status(200);
  });
};

exports.edit = (req, res) => {
  Competence.findByPk(req.body.id,{include: [Resource, Category, Difficulty]})
    .then((competence) => {
      competence.update(
        {
        name: req.body.name,
        description: req.body.description,
        categoryId: req.body.category.id,
        difficultyId: req.body.difficulty.id,
      }
      );
      req.body.resources.forEach(resourceNew => {
        if(resourceNew.id == null || resourceNew.id == ""){
          Resource.create(resourceNew);
        }
        competence.resources.forEach(resourceExisting => {
          if(resourceExisting.id == resourceNew.id){
            resourceExisting.update({
              url: resourceNew.url
            });
          }
        })
      });    
    }).then(() => {
      return res.send({ message: "Competence Updated!" }).status(200);
    });
};

exports.add = (req, res) => {
  Competence.create({
    name: req.body.name,
    description: req.body.description,
    categoryId: req.body.category.id,
    difficultyId: req.body.difficulty.id,
  }).then((competence) => {
    if(req.body.resources){
      req.body.resources.forEach(resourceNew => {
        if(resourceNew.id == null || resourceNew.id == ""){
          Resource.create({
            url: resourceNew.url,
            competenceId: competence.id
          });
        }
      }); 
    }
  }).then(() => {
    return res.send({ message: "Competence Added!" }).status(200);
  });
};

exports.delete = (req, res) => {
  Competence.findByPk(req.body.id, {
    include: [
      {
        model: User_Competneces,
        include: [User, Competence, Status],
      },
      Category,
      Difficulty,
      Resource,
    ],
  }).then((competence) =>{
    competence.resources.forEach(resource => {
        Resource.destroy({where: {id: resource.id}});
    })
    User_Competneces.destroy({where: {competenceId: competence.id}})
  }).then(() => {
    Competence.destroy({where: {id: req.body.id}}).then(() => {
      return res.send("Deleted Competence!").status(200);
    })
  });
};
