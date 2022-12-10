module.exports = (sequelize, Sequelize) => {
    const Resource = sequelize.define("resources", {
      url: {
        type: Sequelize.STRING
      }
    });
  
    return Resource;
  };
  