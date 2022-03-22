const express = require("express");
const router = express.Router();
const itemController = require("../api/controllers/ItemController");
const laptopController = require("../api/controllers/LaptopController");

router.post("/addcart", laptopController.addCart);
router.post("/checkout", laptopController.checkout);
router.get("/totalproduct", laptopController.totalproduct);
router.get("/info", laptopController.info);
router.get("/:slug", itemController.detailItemLaptop);
router.get("/", laptopController.index);
module.exports = router;
