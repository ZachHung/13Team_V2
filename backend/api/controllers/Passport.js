var GoogleStrategy = require("passport-google-oauth2").Strategy;
const CryptoJS = require("crypto-js");
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/User");
const cart = require("../models/Cart");
const jwt = require("jsonwebtoken");
const GOOGLE_CLIENT_ID =
  "711502243204-1ikqm21egulsjen8f5a525277ov187fa.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      User.findOne({
        email: profile.email,
      }).then((data) => {
        console.log(data);
        if (!data) {
          User.create({
            email: profile.email,
            password: CryptoJS.AES.encrypt("123456", process.env.PASS_SECRET),
            phone: "",
            name: profile.displayName,
          }).then((newUser) => {
            cart
              .create({
                userID: newUser._id,
                list: [],
              })
              .then((cartItem) => {
                const { password, ...others } = newUser._doc;
                const accessToken = jwt.sign(
                  {
                    id: newUser._id,
                    isAdmin: newUser.isAdmin,
                  },
                  process.env.JWT_SECRET,
                  { expiresIn: "3d" }
                );
                done(null, { ...others, accessToken });
              })
              .catch((err) => {
                res.json({
                  status: "false",
                  message: "Lỗi database vui lòng nhập lại mã",
                });
              });
          });
        } else {
          const { password, ...others } = data._doc;
          const accessToken = jwt.sign(
            {
              id: data._id,
              isAdmin: data.isAdmin,
            },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
          );
          done(null, { ...others, accessToken });
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
