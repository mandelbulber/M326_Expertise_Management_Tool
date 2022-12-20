const { expect } = require("chai");
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists,
} = require("sequelize-test-helpers");

const db = require("../app/models");

const CompetenceModel = require("../app/models/competence.model")(sequelize,dataTypes);
const Competence = db.competence;

describe("Competence", () => {
  const competence = new Competence();

  checkModelName(CompetenceModel)("competences");

  context("properties", () => {
    ["id", "name", "description", "categoryId", "difficultyId"].forEach(
      checkPropertyExists(competence)
    );
  });
});

const ResourceModel = require("../app/models/resource.model")(sequelize,dataTypes);
const Resource = db.resource;

describe("Resource", () => {
  const resource = new Resource();

  checkModelName(ResourceModel)("resources");

  context("properties", () => {
    ["id", "url", "competenceId"].forEach(checkPropertyExists(resource));
  });
});

const CategoryModel = require("../app/models/category.model")(sequelize,dataTypes);
const Category = db.category;

describe("Category", () => {
  const category = new Category();

  checkModelName(CategoryModel)("categories");

  context("properties", () => {
    ["id", "name"].forEach(checkPropertyExists(category));
  });
});

const DifficultyModel = require("../app/models/difficulty.model")(sequelize,dataTypes);
const Difficulty = db.difficulty;

describe("Difficulty", () => {
  const difficulty = new Difficulty();

  checkModelName(DifficultyModel)("difficulties");

  context("properties", () => {
    ["id", "name"].forEach(checkPropertyExists(difficulty));
  });
});

const RoleModel = require("../app/models/role.model")(sequelize, dataTypes);
const Role = db.role;

describe("Role", () => {
  const role = new Role();

  checkModelName(RoleModel)("roles");

  context("properties", () => {
    ["id", "name"].forEach(checkPropertyExists(role));
  });
});

const StatusModel = require("../app/models/status.model")(sequelize, dataTypes);
const Status = db.status;

describe("Status", () => {
  const status = new Status();

  checkModelName(StatusModel)("status");

  context("properties", () => {
    ["id", "name"].forEach(checkPropertyExists(status));
  });
});

const UserModel = require("../app/models/user.model")(sequelize, dataTypes);
const User = db.user;

describe("User", () => {
  const user = new User();

  checkModelName(UserModel)("users");

  context("properties", () => {
    ["id", "email", "password", "firstname", "lastname"].forEach(
      checkPropertyExists(user)
    );
  });
});

const UserCompetencesModel = require("../app/models/user_competences.model")(sequelize,dataTypes);
const UserCompetences = db.user_competences;

describe("UserCompetences", () => {
  const userCompetences = new UserCompetences();

  checkModelName(UserCompetencesModel)("user_competences");

  context("properties", () => {
    ["userId", "competenceId", "statusId"].forEach(
      checkPropertyExists(userCompetences)
    );
  });
});
