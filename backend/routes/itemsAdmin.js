const express = require("express");
const router = express.Router();
const ItemController = require("../api/controllers/ItemController");
const {
    verifyTokenAdmin
  } = require('../middlewares/verificationHandler');

router.delete("/delete/:id", ItemController.deleteItemAdmin);
router.delete("/deleteMany", ItemController.deleteManyItemsAdmin);
router.get("/edit/:id", verifyTokenAdmin, ItemController.edit);
router.put("/update/:id", verifyTokenAdmin, ItemController.updateItem);
router.put("/updateDetail/:id", verifyTokenAdmin, ItemController.updateItemDetail);
router.get("/", ItemController.getItemsAdmin);
router.post("/", verifyTokenAdmin, ItemController.createPostItems);

module.exports = router;
