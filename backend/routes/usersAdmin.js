const express = require("express");
const router = express.Router();
const AccountController = require("../api/controllers/AccountController");
//var { isAdmin, isLogin } = require("../util/");

router.delete("/delete/:id", AccountController.deleteUsersAdmin);
router.get("/", AccountController.getUsersAdmin);

module.exports = router;
