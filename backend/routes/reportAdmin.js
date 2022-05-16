const express = require("express");
const router = express.Router();
const ReportController = require("../api/controllers/ReportController");

const {
    verifyTokenAdmin
} = require('../middlewares/verificationHandler');

router.get("/overall", ReportController.overall)
router.get("/summary", ReportController.getSummary)
router.get("/getdatachart", ReportController.getDataChart)


module.exports = router;
