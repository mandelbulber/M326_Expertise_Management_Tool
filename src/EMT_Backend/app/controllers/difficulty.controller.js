const db = require("../models");
const Difficulty = db.difficulty;

exports.getAll = (req, res) => {
  Difficulty.findAll({
  }).then((difficulties) => {
    return res.send(difficulties).status(200);
  });
};
