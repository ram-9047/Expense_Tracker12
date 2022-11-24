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

module.exports = router;
