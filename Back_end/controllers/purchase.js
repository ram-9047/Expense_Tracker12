const Razorpay = require("razorpay");
const Purchase = require("../models/purchase.js");
const User = require("../models/user.js");

const purchasepremium = async (req, res) => {
  try {
    var rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = 250;

    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        throw new Error(err);
      }

      res.json({ order, key_id: rzp.key_id });
      // console.log(req.user, "this is user----------------->");
      // console.log(req.user.__proto__, "this is underproto");

      // req.user
      //   .create({ orderid: order.id, status: "PENDING" })
      //   .then(() => {
      //     return res.status(201).json({ order, key_id: rzp.key_id });
      //   })
      //   .catch((err) => {
      //     throw new Error(err);
      //   });
    });
  } catch (err) {
    // console.log(err);
    res.status(403).json({ message: "Something went wrong", error: err });
  }
};

const updateTransactionStatus = async (req, res) => {
  // console.log(req.body, "body in line 39 purchase");
  try {
    const { payment_id, order_id } = req.body;
    let order = await Purchase.create({
      userId: req.user._id,
      paymentid: payment_id,
      orderid: order_id,
      status: "success",
    });

    if (order.status == "success") {
      let user = await User.findById(req.user._id);
      user.isPremium = true;
      await user.save();
      // console.log(user, "user in line 50");
      res
        .status(200)
        .json({ success: true, message: "Transaction Successfull" });
    }
    // Purchase.findOne({ where: { orderid: order_id } })
    //   .then((order) => {
    //     order
    //       .update({ paymentid: payment_id, status: "SUCCESSFUL" })
    //       .then(() => {
    //         req.user.update({ isPremium: true });
    //         return res
    //           .status(202)
    //           .json({ sucess: true, message: "Transaction Successful" });
    //       })
    //       .catch((err) => {
    //         throw new Error(err);
    //       });
    //   })
    //   .catch((err) => {
    //     throw new Error(err);
    //   });
  } catch (err) {
    // console.log(err);
    res.status(403).json({ error: err, message: "Sometghing went wrong" });
  }
};

module.exports = {
  purchasepremium,
  updateTransactionStatus,
};
