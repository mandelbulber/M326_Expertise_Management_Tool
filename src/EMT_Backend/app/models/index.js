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
    },
    retry: {
      match: [/Deadlock/i],
      max: 3, 
      backoffBase: 1000, 
      backoffExponent: 1.5, 
    },
    logging: false
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
db.category = require("./category.model")(sequelize, Sequelize);
db.difficulty = require("../models/difficulty.model.js")(sequelize, Sequelize);
db.user_competences = sequelize.define("user_competences", {}, { timestamps: false });

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

// The Super Many-to-Many relationship
db.user.belongsToMany(db.competence, { through: db.user_competences });
db.competence.belongsToMany(db.user, { through:  db.user_competences });
db.user.hasMany(db.user_competences);
db.user_competences.belongsTo(db.user);
db.competence.hasMany(db.user_competences);
db.user_competences.belongsTo(db.competence);


db.status.hasMany(db.user_competences, { foreignKey: 'statusId' });
db.user_competences.belongsTo(db.status, { foreignKey: 'statusId' });

db.competence.hasMany(db.resource, { foreignKey: 'competenceId' });
db.resource.belongsTo(db.competence, { foreignKey: 'competenceId' });

db.category.hasMany(db.competence, {foreignKey: 'categoryId'});
db.competence.belongsTo(db.category, {foreignKey: 'categoryId'});

db.difficulty.hasMany(db.competence, {foreignKey: 'difficultyId'});
db.competence.belongsTo(db.difficulty, {foreignKey: 'difficultyId'})

db.ROLES = ["teacher", "admin"];
db.DIFFICULTIES = ["Easy", "Medium", "Hard"];

module.exports = db;
