const express = require("express");
const router = express.Router();
const CheckoutController = require("../api/controllers/CartController");
const {
  verifyTokenAdmin,
  verifyTokenAuth,
} = require("../middlewares/verificationHandler");

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
// @access ADMIN
router.get("/find", verifyTokenAdmin, CheckoutController.getAllCart);
router.get("/find/:userID", verifyTokenAdmin, CheckoutController.getAnyCart);
module.exports = router;
