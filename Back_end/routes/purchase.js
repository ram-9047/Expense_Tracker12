const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const purchaseController = require("../controllers/purchase.js");

// GET request for getting Order ID of Razor Pay
router.get("/premium", auth.authenticate, purchaseController.purchasepremium);

// POST reques
router.post(
  "/updateStatus",
  auth.authenticate,
  purchaseController.updateTransactionStatus
);

module.exports = router;
