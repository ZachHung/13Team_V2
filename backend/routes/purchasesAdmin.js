const express = require("express");
const router = express.Router();
const PurchaseController = require("../api/controllers/PurchaseController");


router.delete("/delete/:id", PurchaseController.deletePurchasesAdmin);
router.get("/edit/:id", PurchaseController.edit);
router.post("/update/:id", PurchaseController.updatePurchase);
router.get("/", PurchaseController.getPurchasesAdmin);

module.exports = router;
