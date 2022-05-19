const express = require("express");
const router = express.Router();
const PurchaseController = require("../api/controllers/PurchaseController");
const {
    verifyTokenAdmin
} = require('../middlewares/verificationHandler');

router.delete("/delete/:id", verifyTokenAdmin, PurchaseController.deletePurchasesAdmin);
router.delete("/deleteMany", verifyTokenAdmin, PurchaseController.deleteManyPurchasesAdmin);
router.get("/detail/:id", verifyTokenAdmin, PurchaseController.detailPurchasesAdmin);
router.get("/edit/:id", verifyTokenAdmin, PurchaseController.edit);
router.put("/update/:id", verifyTokenAdmin, PurchaseController.updatePurchase);
router.get("/", verifyTokenAdmin, PurchaseController.getPurchasesAdmin);

module.exports = router;
