const express = require("express");
const router = express.Router();
const AccountController = require("../api/controllers/AccountController");

router.get("/", AccountController.getProfileAdmin);

module.exports = router;
