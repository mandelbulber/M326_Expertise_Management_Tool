module.exports = (sequelize, Sequelize) => {
    const Status = sequelize.define("status", {
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Status;
  };
  