const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense.js");

//add expense
router.post("/addExpense", expenseController.addExpense);

// get all expenses
router.get("/allexpense", expenseController.getExpense);

//delete an expense
router.post("/deleteExpense/:expenseID", expenseController.deleteExpense);

module.exports = router;
