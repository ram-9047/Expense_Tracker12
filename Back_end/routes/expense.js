const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense.js");
const auth = require("../middleware/auth.js");

//add expense
router.post("/addExpense", auth.authenticate, expenseController.addExpense);

// get all expenses
router.get("/getAllExpense", auth.authenticate, expenseController.getExpense);

//delete an expense
router.post(
  "/deleteExpense/:expenseID",
  auth.authenticate,
  expenseController.deleteExpense
);

// user is premium or not
router.get("/checkStatus", auth.authenticate, expenseController.isPremium);

// get all users name --> premium feature
router.get("/allUser", auth.authenticate, expenseController.allUser);

//get other user expense details if the current user is premium user
router.get("/user/:userID", auth.authenticate, expenseController.getSingleUser);




module.exports = router;
