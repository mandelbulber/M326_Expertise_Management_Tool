const db = require("../models");
const Status = db.status;

exports.getAll = (req, res) => {
  Status.findAll({
  }).then((status) => {
    return res.send(status).status(200);
  });
};
