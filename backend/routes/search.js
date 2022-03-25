const express = require("express");
const router = express.Router();
const search = require("../api/controllers/SearchController");

router.get("/info", search.info);
router.get("/match", search.match);
router.get("/global", search.global);
router.get("/", search.index);

module.exports = router;