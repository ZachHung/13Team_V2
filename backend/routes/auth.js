const express = require("express");
require("dotenv").config();

const router = express.Router();
const passport = require("passport");
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else
    res.status(401).json({
      message: "fail",
    });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_PATH);
});
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_PATH}/login`,
    failureRedirect: "/api/auth/login/failed",
  })
);
module.exports = router;
