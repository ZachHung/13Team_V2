const express = require("express");
const AccountController = require("../api/controllers/AccountController");
const router = express.Router();
const CheckoutController = require("../api/controllers/CartController");

// @access PRIVATE
router.get("/", CheckoutController.getCart);
router.put("/:optionID", CheckoutController.updateItem);
router.delete("/:optionID", CheckoutController.removeItem);
router.post("/add", CheckoutController.addCart);
router.post("/purchase", CheckoutController.purchaseCart);
// @access ADMIN
router.get("/find", CheckoutController.getAllCart);
router.get("/find/:userID", CheckoutController.getAnyCart);
module.exports = router;
