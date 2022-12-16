const db = require("../models");
const Difficulty = db.difficulty;

exports.getAll = (req, res) => {
  Difficulty.findAll({
    raw: true,
    nest: true,
  }).then((difficulties) => {
    return res.send(difficulties).status(200);
  });
};
