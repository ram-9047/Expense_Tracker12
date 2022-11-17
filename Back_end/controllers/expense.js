const Expense = require("../models/expense.js");

// Add an expense

exports.addExpense = (req, res, next) => {
  //   console.log(req.headers.token);
  const amount = req.body.amount;
  const category = req.body.category;
  const description = req.body.description;
  Expense.create({ amount, description, category })
    .then((expense) => {
      res
        .status(201)
        .json({ expense, success: true, message: "expense created" });
    })
    .catch((err) => {
      console.log(err, "error in creating expense");
      return res
        .status(403)
        .json({ success: false, message: "Expense not creted" });
    });
};

// Get all Expense

exports.getExpense = (req, res, next) => {
  Expense.findAll()
    .then((result) => {
      return res.status(200).json({ result, success: true });
    })
    .catch((err) => {
      return res.status(403).json({ err, success: false });
    });
};

// Delete ans expense

exports.deleteExpense = (req, res, next) => {
  const expenseID = req.params.id;
  Expense.destroy({ where: { id: expenseID } })
    .then(() => {
      return res
        .status(204)
        .json({ success: true, message: "Deleted Successfuly" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(403).json({ success: false, message: "Failed" });
    });
};
