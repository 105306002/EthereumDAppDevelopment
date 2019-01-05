var express = require('express');
var router = express.Router();

const Client = require('../models/client');

let client = new Client();

router.get('/getUserData', client.getUserData);
router.get('/getContractData', client.getContractData);
router.get('/getHealthDataByUserAccountDesc/:contractAddress/:userId', client.getHealthDataByUserAccountDesc);
module.exports = router;