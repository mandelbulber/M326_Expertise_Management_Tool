module.exports = (sequelize, Sequelize) => {
    const Competence = sequelize.define("competences", {
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return Competence;
  };
  