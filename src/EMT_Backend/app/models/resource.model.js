module.exports = (sequelize, Sequelize) => {
    const Resource = sequelize.define("resources", {
      url: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isUrl: true
        }
      }
    });
  
    return Resource;
  };
  