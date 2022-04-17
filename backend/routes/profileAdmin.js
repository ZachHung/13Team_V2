const express = require("express");
const router = express.Router();
const AccountController = require("../api/controllers/AccountController");

router.put("/update/:id", AccountController.updateProfileAdmin);
router.get("/:id", AccountController.editProfileAdmin);

module.exports = router;
