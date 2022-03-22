const express = require("express");
const AccountController = require("../api/controllers/AccountController");
const router = express.Router();
const CheckoutController = require("../api/controllers/CartController");

router.get("/", CheckoutController.index);
router.put("/set-quantity", CheckoutController.setQuantity);
router.delete("/:id", CheckoutController.removeItem);
router.post("/addcart", AccountController.addCart);
router.post("/purchase", CheckoutController.purchaseCart);
module.exports = router;
