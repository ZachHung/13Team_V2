const express = require("express");
const router = express.Router();
const account = require("../api/controllers/AccountController");
const { verifyTokenAuth } = require("../middlewares/verificationHandler");
router.get("/info/:userID", verifyTokenAuth, account.userInfo);
router.post("/update/:userID", verifyTokenAuth, account.update);
module.exports = router;
