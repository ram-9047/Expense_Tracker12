const Sequelize = require("sequelize");

const sequelize = new Sequelize("expenseTracker", "root", "sql@9047", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
