const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jsw = require("jsonwebtoken");
let saltRound = 10;

exports.signup = (req, res, next) => {
  // console.log(req.body);
  // let { userName, email, password } = req.body;
  let userName = req.body.userName;
  let email = req.body.email;
  let password = req.body.password;
  // console.log(userName, email, password);
  bcrypt.genSalt(saltRound, (err, newSalt) => {
    bcrypt.hash(password, newSalt, async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        try {
          let x = await User.create({
            name: userName,
            email: email,
            password: result,
          });
          // console.log(x, "user");
          res.status(200).json({ message: "User Created" });
        } catch (error) {
          // console.log(error);
          if (error.errors[0]["message"] == "email must be unique") {
            res.status(201).json({ message: "Email Must be unique" });
          }
        }
      }
    });
  });
};

//generate token ID
function generateToken(id) {
  return jsw.sign(id, process.env.TOKEN_SECRET);
}

exports.login = async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  User.findAll({ where: { email } })
    .then((user) => {
      // console.log(user);

      if (user.length > 0) {
        bcrypt.compare(password, user[0]["password"], (err, result) => {
          if (err) {
            console.log(err);
            res
              .status(404)
              .json({ success: false, message: "Password is Incorrect" });
          }
          if (result) {
            console.log(result, "result");
            // console.log(user);
            let userID = user[0].dataValues.id;
            let token = generateToken(userID);
            console.log(token);
            res
              .status(200)
              .json({ token, success: true, message: "Logged In" });
          } else {
            res
              .status(404)
              .json({ success: false, message: "Password in not correct" });
          }
        });
      } else {
        res.status(404).json({ message: "User Not Found" });
      }
    })
    .catch((error) => {
      console.log(error, "error in login controller");
      res.status(404).json({ message: "User not found" });
    });
};
