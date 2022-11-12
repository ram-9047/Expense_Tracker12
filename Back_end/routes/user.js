const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");

//sign-up new user POST
router.post("/signup", userController.signup);

//login-in user POST
router.post("/login", userController.login);

module.exports = router;
