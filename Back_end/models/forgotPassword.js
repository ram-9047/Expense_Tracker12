const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const forgotPassSchema = new Schema({
  active: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  uuid: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ForgotPassword", forgotPassSchema);

// const Sequelize = require("sequelize");
// const sequelize = require("../util/database.js");

// const ForgotPassword = sequelize.define("forgotPassword", {
//   id: {
//     type: Sequelize.UUID,
//     allowNull: false,
//     primaryKey: true,
//   },
//   active: {
//     type: Sequelize.BOOLEAN,
//   },
//   expiryDate: {
//     type: Sequelize.DATE,
//   },
// });

// module.exports = ForgotPassword;
