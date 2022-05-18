const express = require("express");
const router = express.Router();
const AccountController = require("../api/controllers/AccountController");
const {
    verifyTokenAdmin,
    verifyTokenAuth,
} = require('../middlewares/verificationHandler');

router.delete("/delete/:id", AccountController.deleteUsersAdmin);
router.delete("/deleteMany", AccountController.deleteManyUsersAdmin);
router.get("/edit/:id", verifyTokenAdmin, AccountController.edit);
router.put("/update/:id",verifyTokenAdmin, AccountController.updateUser);
router.get("/", AccountController.getUsersAdmin);

module.exports = router;
