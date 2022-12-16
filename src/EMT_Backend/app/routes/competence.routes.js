const { authJwt } = require("../middleware");
const controller = require("../controllers/competence.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/competence", [authJwt.verifyToken], controller.getAllByUser);

  app.get("/api/competence/user", [authJwt.verifyToken], controller.getAllByUserId);

  app.get("/api/competence/edit", [authJwt.verifyToken, authJwt.isAdmin], controller.getById);
};