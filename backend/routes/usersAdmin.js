const express = require("express");
const router = express.Router();
const AccountController = require("../api/controllers/AccountController");
//var { isAdmin, isLogin } = require("../util/");

router.delete("/delete/:id", AccountController.deleteUsersAdmin);
router.get("/edit/:id", AccountController.edit);
router.post("/update/:id", AccountController.updateUser);
router.get("/", AccountController.getUsersAdmin);

module.exports = router;
