const express = require("express");
const router = express.Router();
const CheckoutController = require("../api/controllers/CartController");
const {
  verifyTokenAdmin,
  verifyTokenAuth,
} = require("../middlewares/verificationHandler");

// @access PUBLIC
router.get("/vnpay_return", CheckoutController.vnPay_returnUrl);
router.get("/vnpay_ipn", CheckoutController.vnPay_ipn);
// @access PRIVATE
router.get("/:userID", verifyTokenAuth, CheckoutController.getCart);
router.put("/:userID", verifyTokenAuth, CheckoutController.updateItem);
router.delete("/:userID", verifyTokenAuth, CheckoutController.removeItem);
router.post("/add/:userID", verifyTokenAuth, CheckoutController.addCart);
router.post(
  "/purchase/:userID",
  verifyTokenAuth,
  CheckoutController.purchaseCart
);
router.post(
  "/:userID/create_payment_url",
  verifyTokenAuth,
  CheckoutController.vnPay_createPayment
);
// @access ADMIN
router.get("/find", verifyTokenAdmin, CheckoutController.getAllCart);
router.get("/find/:userID", verifyTokenAdmin, CheckoutController.getAnyCart);
module.exports = router;
