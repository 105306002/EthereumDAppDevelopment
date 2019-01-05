var express = require('express');
var router = express.Router();

const ServerSubscribe = require('../models/server');

let serverSubscribe = new ServerSubscribe();
router.get('/subscribecreateContractEvent', serverSubscribe.createContractEvent);
router.put('/subscribeupdateHealthDataEvent', serverSubscribe.updateHealthDataEvent);
module.exports = router;