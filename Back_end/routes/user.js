const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");

//POST User
router.post("/signup", userController.signup);

module.exports = router;
