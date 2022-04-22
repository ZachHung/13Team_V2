const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const cookieSession = require("cookie-session");
const session = require("express-session");
const passport = require("passport");
const passportSetup = require("./api/controllers/Passport");
const app = express();
const route = require("./routes");
const compression = require("compression");

const { errorHandler } = require("./middlewares/errorHandler");
const methodOverride = require("method-override");

require("dotenv").config();

// Compression and https redirection when in production mode
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(301, `https://${req.header("host")}${req.url}`);
    else next();
  });
  app.use(
    compression({
      threshold: 0,
    })
  );
}
//HTTP logger (only when in dev mode)
process.env.NODE_ENV === "development" && app.use(morgan("combined"));

// API calls
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

//connect auth google
app.use(
  cookieSession({
    name: "session",
    keys: ["Nhutpro"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// DB connect
const db = require("./config/db");

db.connect();

//Override method (PUT, DELETE)
app.use(methodOverride("_method"));

//route//
route(app);

app.use(express.static(path.join(__dirname, "public")));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});
