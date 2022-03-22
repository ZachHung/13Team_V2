const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();
const route = require("./routes");
const compression = require("compression");
const { errorHandler } = require("./middlewares/errorHandler");
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
process.env.NODE_ENV !== "production" && app.use(morgan("combined"));

// API calls
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// DB connect
const db = require("./config/db");
db.connect();

//route//
route(app);
// app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});
