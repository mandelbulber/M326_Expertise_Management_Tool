const db = require("../models");
const Status = db.status;

exports.getAll = (req, res) => {
  Status.findAll({
    raw: true,
    nest: true,
  }).then((status) => {
    return res.send(status).status(200);
  });
};
