const Sequelize = require("sequelize");

const sequelize = new Sequelize("expenseTracker", "root", "sql@9047", {
  dialect: "mysql",
  host: "localhost",
});

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((error) => {
//     console.error("Unable to connect to the database: ", error);
//   });

module.exports = sequelize;
