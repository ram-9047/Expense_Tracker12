const Expense = require("../models/expense.js");
const User = require("../models/user.js");
const AWS = require("aws-sdk");

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
  // console.log(req.user.id);
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

exports.isPremium = (req, res, next) => {
  console.log(req.user.isPremium, "this is user");
  res.status(200).json({ success: true, status: req.user.isPremium });
};

exports.allUser = (req, res, next) => {
  console.log(req.user.id);
  User.findAll()
    .then((result) => {
      // console.log(result);
      let responseArray = result.filter((item) => item.id != req.user.id);

      res.status(200).json({ responseArray, success: true });
    })
    .catch((err) => {
      console.log(err, "error in getting all user for premium member");
      res.status(403).json({ success: false, message: "Failed" });
    });
};

exports.getSingleUser = (req, res, next) => {
  // console.log(req.params.userID);
  Expense.findAll({ where: { userId: req.params.userID } })
    .then((result) => {
      return res.status(200).json({ result, success: true });
    })
    .catch((err) => {
      return res.status(403).json({ err, success: false });
    });
};

function uploadToS3(data, fileName) {
  const BUCKET_NAME = process.env.BUCKET_NAME;
  const IAM_USER_KEY = process.env.IAM_USER_KEY;
  const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

  let s2Bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
  });

  // s2Bucket.createBucket(() => {
  var params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: data,
    ACL: "public-read",
  };

  return new Promise((result, reject) => {
    s2Bucket.upload(params, (err, response) => {
      if (err) {
        console.log(err, "error in uploading data to s2");
        reject(err);
      } else {
        // console.log(response, "response after uploading data");
        // console.log(response.Location);
        // x = response.Location;
        // return response;
        result(response.Location);
      }
    });
  });
  // });
}

exports.downloadAllExpense = async (req, res, next) => {
  // console.log(req.user.__proto__);
  console.log(req.user);
  let expense = await req.user.getExpenses();
  const stringfyExpense = JSON.stringify(expense);
  // console.log(stringfyExpense);
  const fileName = `${req.user.id}__Expense.txt`;
  const fileURL = await uploadToS3(stringfyExpense, fileName);
  console.log(fileURL, "this is final url");
  res.status(200).json({ fileURL, message: "this is the file" });
};
