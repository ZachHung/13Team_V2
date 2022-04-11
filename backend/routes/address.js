const express = require("express");
const router = express.Router();
const address = require("../api/controllers/Address");

router.get("/district", address.District);
router.get("/district/ward", address.Ward);
router.get("/getalladress", address.GetAllAddress);
router.get("/district/:name", address.GetDistrict);
router.get("/ward/:name1/:name2", address.GetWard);
module.exports = router;
