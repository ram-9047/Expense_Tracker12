const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database.js");
const cors = require("cors");

const app = express();

//Routes
const userRoutes = require("./routes/user.js");

//Models Import

app.use(bodyParser.json());
app.use(cors());

app.use(userRoutes);

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
