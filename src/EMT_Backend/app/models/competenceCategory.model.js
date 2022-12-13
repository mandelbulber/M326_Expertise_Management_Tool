module.exports = (sequelize, Sequelize) => {
    const CompetenceCategory = sequelize.define("competence_categories", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return CompetenceCategory;
  };
  