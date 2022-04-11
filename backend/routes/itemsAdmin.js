const express = require("express");
const router = express.Router();
const ItemController = require("../api/controllers/ItemController");

router.delete("/delete/:id", ItemController.deleteItemAdmin);
router.get("/edit/:id", ItemController.edit);
router.post("/update/:id", ItemController.updateItem);
router.post("/updateDetail/:id", ItemController.updateItemDetail);
router.get("/", ItemController.getItemsAdmin);

module.exports = router;
