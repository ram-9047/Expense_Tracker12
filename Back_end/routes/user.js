const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");

//sign-up new user POST
router.post("/signup", userController.signup);

//login-in user POST
router.post("/login", userController.login);

//forgot password -- find user
router.post("/findUser", userController.findUser);

//forgot password -- update password
router.post("/resetPassword", userController.resetPassword);

module.exports = router;
