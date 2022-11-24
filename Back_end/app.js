const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database.js");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

//Routes
const userRoutes = require("./routes/user.js");
const expenseRoutes = require("./routes/expense.js");
const premiumRoutes = require("./routes/purchase.js");

//Models Import
const User = require("./models/user.js");
const Expense = require("./models/expense.js");
const Order = require("./models/purchase.js");

app.use(bodyParser.json());
app.use(cors());
dotenv.config();

// Database Relationship
User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

app.use(userRoutes);
app.use(expenseRoutes);
app.use(premiumRoutes);

const port = 3000;

sequelize

  // .sync({ force: true })
  .sync()
  .then(() => {
    console.log("db connected");
    app.listen(port, () => {
      console.log(`server is strted at port :${port}`);
    });
  })
  .catch((err) => {
    console.log(err, "error in connecting db");
  });
