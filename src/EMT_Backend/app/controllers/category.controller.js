const db = require("../models");
const Category = db.category;

exports.getAll = (req, res) => {
  Category.findAll({
    raw: true,
    nest: true,
  }).then((categories) => {
    return res.send(categories).status(200);
  });
};
