module.exports = (sequelize, Sequelize) => {
    const Difficulty = sequelize.define("difficulties", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return Difficulty;
  };
  