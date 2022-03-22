const express = require("express");
const router = express.Router();
const account = require("../api/controllers/AccountController");

router.get("/info", account.userInfo);
router.post("/update", account.update);
module.exports = router;
