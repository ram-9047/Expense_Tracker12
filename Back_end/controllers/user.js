const User = require("../models/user.js");
const bycrypt = require("bcrypt");
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
