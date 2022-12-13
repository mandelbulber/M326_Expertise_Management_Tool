const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.status = require("../models/status.model.js")(sequelize, Sequelize);
db.competence = require("../models/competence.model.js")(sequelize, Sequelize);
db.resource = require("../models/resource.model.js")(sequelize, Sequelize);
db.competencecategory = require("../models/competenceCategory.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.status.hasMany(db.competence, { foreignKey: 'statusId' });
db.competence.belongsTo(db.status, { foreignKey: 'statusId' });

db.user.hasMany(db.competence, { foreignKey: 'userId' });
db.competence.belongsTo(db.user, { foreignKey: 'userId' });

db.competence.hasMany(db.resource, { foreignKey: 'competenceId' });
db.resource.belongsTo(db.competence, { foreignKey: 'competenceId' });

db.competencecategory.hasMany(db.competence, {foreignKey: 'competenceCategoryId'});
db.competence.belongsTo(db.competencecategory, {foreignKey: 'competenceCategoryId'});

db.ROLES = ["teacher", "admin"];

module.exports = db;
