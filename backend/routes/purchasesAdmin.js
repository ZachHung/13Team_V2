const express = require("express");
const router = express.Router();
const PurchaseController = require("../api/controllers/PurchaseController");
const {
    verifyTokenAdmin,
    verifyTokenAuth,
} = require('../middlewares/verificationHandler');

router.delete("/delete/:id", PurchaseController.deletePurchasesAdmin);
router.delete("/deleteMany", PurchaseController.deleteManyPurchasesAdmin);
router.get("/detail/:id", PurchaseController.detailPurchasesAdmin);
router.get("/edit/:id", verifyTokenAdmin, PurchaseController.edit);
router.put("/update/:id", verifyTokenAdmin, PurchaseController.updatePurchase);
router.get("/", PurchaseController.getPurchasesAdmin);

module.exports = router;
