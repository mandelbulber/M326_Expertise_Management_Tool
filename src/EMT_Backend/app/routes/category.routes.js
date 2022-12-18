const { authJwt } = require("../middleware");
const controller = require("../controllers/category.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/category", [authJwt.verifyToken], controller.getAll);

  app.get("/api/category/byId", [authJwt.verifyToken, authJwt.isAdmin], controller.getById);

  app.post("/api/category/edit", [authJwt.verifyToken, authJwt.isAdmin], controller.edit);

  app.post("/api/category/add", [authJwt.verifyToken, authJwt.isAdmin], controller.add);

  app.post("/api/category/delete", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);
};