const express = require("express");
const router = express.Router();
const ReportController = require("../api/controllers/ReportController");

const {
    verifyTokenAdmin
} = require('../middlewares/verificationHandler');

router.get("/overall", verifyTokenAdmin, ReportController.overall)
router.get("/summary", verifyTokenAdmin, ReportController.getSummary)
router.get("/getdatachart", verifyTokenAdmin, ReportController.getDataChart)


module.exports = router;
