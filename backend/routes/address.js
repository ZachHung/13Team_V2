const express = require("express");
const router = express.Router();
const address = require("../api/controllers/Address");

router.get("/district", address.District);
router.get("/district/ward", address.Ward);
module.exports = router;
