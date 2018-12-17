var express = require('express');
var router = express.Router();

const Client = require('../models/client');

let client = new Client();
router.get('/getuserdata', client.getUserData);
router.get('/getdevicedata', client.getDeviceData);
router.get('/gethealthdatabyuseraccount/:useraccount/:devicecontractaddress', client.getHealthDataByUserAccount);
router.get('/gethealthdatabyuseraccount2', client.getHealthDataByUserAccount2);
module.exports = router;