var express = require('express');
var router = express.Router();

const ServerSubscribe = require('../models/server');

let serverSubscribe = new ServerSubscribe();
router.get('/subscribecreatecontainerevent', serverSubscribe.createContainerEvent);
router.put('/subscribeupdatehealthdataevent', serverSubscribe.updateHealthDataEvent);
module.exports = router;