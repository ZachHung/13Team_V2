const express = require("express");
const router = express.Router();
const ItemController = require("../api/controllers/ItemController");

router.delete("/delete/:id", ItemController.deleteItemAdmin);
router.get("/", ItemController.getItemsAdmin);

module.exports = router;
