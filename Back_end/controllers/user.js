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
          let user = await new User({
            name: userName,
            email: email,
            password: result,
          });

          user.save().then(() => {
            res.status(200).json({ message: "User created" });
          });
        } catch (error) {
          console.log(error, "error in creating user");
          // if (error.errors[0]["message"] == "email must be unique") {
          //   res.status(201).json({ message: "Email Must be unique" });
          // }
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

  User.find({ email: `${email}` })
    .then((user) => {
      // console.log(user[0], "user found");
      if (user) {
        bcrypt.compare(password, user[0].password, (err, result) => {
          if (err) {
            console.log(err);
            res.status(400).json({ message: "user not found" });
          }
          if (result) {
            let userId = user[0]._id;
            let token = generateToken(userId.toString());
            res.status(200).json({ token, message: "user found" });
          }
        });
      }
    })
    .catch();
};
