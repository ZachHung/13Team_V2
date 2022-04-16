const express = require("express");
const router = express.Router();
const ItemController = require("../api/controllers/ItemController");
const multer = require('multer')
const upload = multer({ dest: "./backend/public/image/uploads/" })

router.delete("/delete/:id", ItemController.deleteItemAdmin);
router.delete("/deleteMany", ItemController.deleteManyItemsAdmin);
router.get("/edit/:id", ItemController.edit);
router.put("/update/:id", upload.single('upload'), ItemController.updateItem);
router.put("/updateDetail/:id", upload.single('upload'),  ItemController.updateItemDetail);
router.get("/", ItemController.getItemsAdmin);
router.post("/",ItemController.createPostItems);

module.exports = router;
