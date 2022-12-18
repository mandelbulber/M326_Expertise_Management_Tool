const { authJwt } = require("../middleware");
const controller = require("../controllers/user_competences.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/user_competences/update", [authJwt.verifyToken], controller.updateStatus);

  app.post("/api/user_competences/add", [authJwt.verifyToken], controller.addStatus);
};