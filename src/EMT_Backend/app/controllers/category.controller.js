const db = require("../models");
const Category = db.category;

exports.getAll = (req, res) => {
  Category.findAll({
  }).then((categories) => {
    return res.send(categories).status(200);
  });
};
