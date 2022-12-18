const db = require("../models");
const User_Competences = db.user_competences;

exports.updateStatus = (req, res) => {
  User_Competences.findOne({where: {userId: req.body.userId, competenceId: req.body.competenceId}}).then((user_competence) => {
    if(req.body.status == null){
      user_competence.destroy();
    }else{
      user_competence.update({statusId: req.body.status.id});
    }
    
  }).then(() => {
    return res.send("Status Updated!").status(200);
  });
};

exports.addStatus = (req, res) => {
  User_Competences.create({userId: req.body.userId, statusId: req.body.status.id,competenceId: req.body.competenceId}).then(() => {
    return res.send("Status Added!").status(200);
  })
};