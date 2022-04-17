const express = require("express");
const router = express.Router();
const ItemController = require("../api/controllers/ItemController");
router.get("/:id",ItemController.findItemById);
router.post("/:id",ItemController.createPostOptions);        
module.exports = router;