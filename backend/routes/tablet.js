const express = require("express");
const router = express.Router();
const itemController = require("../api/controllers/ItemController");
const tabletController = require("../api/controllers/TabletController");

router.post("/addcart", tabletController.addCart);
router.post("/checkout", tabletController.checkout);
router.get("/totalproduct", tabletController.totalproduct);
router.get("/info", tabletController.info);
router.get("/:slug", itemController.detailItemTablet);
router.get("/", tabletController.index);
module.exports = router;
