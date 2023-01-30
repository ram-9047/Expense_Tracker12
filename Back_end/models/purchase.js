const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  paymentid: {
    type: String,
  },
  orderid: {
    type: String,
  },
  status: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Purchase", purchaseSchema);

// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");

// const Purchase = sequelize.define("purchase", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   paymentid: {
//     type: Sequelize.STRING,
//     // allowNull: false,
//   },
//   orderid: {
//     type: Sequelize.STRING,
//     // allowNull: false,
//   },
//   status: {
//     type: Sequelize.STRING,
//     // allowNull: false,
//   },
// });

// module.exports = Purchase;
