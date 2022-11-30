const Sequelize = require("sequelize");
const sequelize = require("../util/database.js");

const ForgotPassword = sequelize.define("forgotPassword", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  active: {
    type: Sequelize.BOOLEAN,
  },
  expiryDate: {
    type: Sequelize.DATE,
  },
});

module.exports = ForgotPassword;
