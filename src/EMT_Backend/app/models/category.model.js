module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("categories", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return Category;
  };
  