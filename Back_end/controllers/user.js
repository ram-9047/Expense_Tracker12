const User = require("../models/user.js");
const bycrypt = require("bcrypt");
const { use } = require("bcrypt/promises.js");
let saltRound = 10;

exports.signup = async (req, res, next) => {
  // console.log(req.body);
  // let { userName, email, password } = req.body;
  let userName = req.body.userName;
  let email = req.body.email;
  let password = req.body.password;
  // console.log(userName, email, password);
  try {
    await User.create({
      name: userName,
      email: email,
      password: password,
    });
    res.status(200).json({ message: "User Created" });
  } catch (error) {
    // console.log(error);
    if (error.errors[0]["message"] == "email must be unique") {
      res.status(201).json({ message: "Email Must be unique" });
    }
  }
  // console.log(user, " user created");
};

exports.login = async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  User.findAll({ where: { email } })
    .then((user) => {
      // console.log(user);

      // CASE 1 -  user found , correct credentails
      if (user.length > 0 && user[0]["password"] == password) {
        res.status(200).json({ message: "User Found" });
      }

      // user found but wrong password
      else if (user.length > 0 && user[0]["password"] != password) {
        res.status(401).json({ message: "Wrong Password" });
      }

      // user not found
      else {
        res.status(404).json({ message: "User Not Found" });
      }
    })
    .catch((error) => {
      console.log(error, "error in login controller");
    });
};
