const Expense = require("../models/expense.js");

// Add an expense

exports.addExpense = (req, res, next) => {
  //   console.log(req.headers.token);
  //   console.log(req.user, "user id in controller");
  const amount = req.body.amount;
  const category = req.body.category;
  const description = req.body.description;
  req.user
    .createExpense({ amount, description, category })
    .then((result) => {
      res
        .status(201)
        .json({ result, success: true, message: "Exepnse Created" });
    })
    .catch((err) => {
      console.leg(err);
    });
};

// Get all Expense of user

exports.getExpense = (req, res, next) => {
  //   console.log(req.user.id);
  Expense.findAll({ where: { userId: req.user.id } })
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
