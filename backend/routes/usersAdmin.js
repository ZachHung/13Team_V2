const express = require("express");
const router = express.Router();
const AccountController = require("../api/controllers/AccountController");
const {
    verifyTokenAdmin,
    verifyTokenAuth,
} = require('../middlewares/verificationHandler');

router.delete("/delete/:id", verifyTokenAdmin, AccountController.deleteUsersAdmin);
router.delete("/deleteMany", verifyTokenAdmin, AccountController.deleteManyUsersAdmin);
router.get("/edit/:id", verifyTokenAdmin, AccountController.edit);
router.put("/update/:id", verifyTokenAdmin, AccountController.updateUser);
router.get("/", verifyTokenAdmin, AccountController.getUsersAdmin);

module.exports = router;
