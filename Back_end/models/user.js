const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  expenses: {
    expenseId: {
      type: Schema.Types.ObjectId,
      ref: "Expenses",
    },
  },
});

module.exports = mongoose.model("User", userSchema);

// const Sequelize = require("sequelize");

// const sequelize = require("../util/database.js");

// const User = sequelize.define("user", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   isPremium: {
//     type: Sequelize.BOOLEAN,
//     default: false,
//   },
// });

// module.exports = User;
