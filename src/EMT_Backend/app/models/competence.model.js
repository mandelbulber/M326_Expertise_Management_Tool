module.exports = (sequelize, Sequelize) => {
    const Competence = sequelize.define("competences", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    });
  
    return Competence;
  };
  