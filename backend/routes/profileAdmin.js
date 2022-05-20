const express = require("express");
const router = express.Router();
const AccountController = require("../api/controllers/AccountController");
const {
    verifyTokenAdmin
} = require('../middlewares/verificationHandler');
  
router.put("/update/:id", verifyTokenAdmin, AccountController.updateProfileAdmin);
router.get("/:id", verifyTokenAdmin, AccountController.editProfileAdmin);

module.exports = router;
