const express = require("express");
const router = express.Router();
const ItemController = require("../api/controllers/ItemController");
const {
    verifyTokenAdmin
  } = require('../middlewares/verificationHandler');

router.delete("/delete/:id", verifyTokenAdmin, ItemController.deleteItemAdmin);
router.delete("/deleteMany", verifyTokenAdmin, ItemController.deleteManyItemsAdmin);
router.get("/edit/:id", verifyTokenAdmin, ItemController.edit);
router.put("/update/:id", verifyTokenAdmin, ItemController.updateItem);
router.put("/updateDetail/:id", ItemController.updateItemDetail);
router.get("/", verifyTokenAdmin, ItemController.getItemsAdmin);
router.post("/", verifyTokenAdmin, ItemController.createPostItems);

module.exports = router;
