var express = require('express');
var router = express.Router();
const HealthRecord = require('../models/healthRecord');
let healthRecord = new HealthRecord();
router.post('/updateHealthData', healthRecord.updateHealthData);
module.exports = router;