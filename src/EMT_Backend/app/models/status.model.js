module.exports = (sequelize, Sequelize) => {
    const Status = sequelize.define("status", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return Status;
  };
  