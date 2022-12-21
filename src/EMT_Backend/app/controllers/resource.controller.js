const db = require("../models");
const Resource = db.resource;

exports.deteleById = (req, res) => {
  Resource.destroy({where: {
    id: req.body.id
  }}).then(() => {
    return res.send("Test");
    }).catch((err) => {
    console.log(err);
    return err;
  });
};
