const express = require("express");
const router = express.Router();
const ItemController = require("../api/controllers/ItemController");

router.delete("/delete/:id", ItemController.deleteItemAdmin);
router.delete("/deleteMany", ItemController.deleteManyItemsAdmin);
router.get("/edit/:id", ItemController.edit);
router.put("/update/:id", ItemController.updateItem);
router.put("/updateDetail/:id", ItemController.updateItemDetail);
router.get("/", ItemController.getItemsAdmin);
router.post("/",ItemController.createPostItems);

module.exports = router;
