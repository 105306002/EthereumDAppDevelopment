const express = require('express');
const Utility = require('../models/utility');
var utilityRouter = express.Router();

utility = new Utility();

// utilityRouter.post('/deploydeviceprovider', utility.deployDeviceProvider);
// utilityRouter.post('/deployhealthdevice', utility.deployHealthDevice);
utilityRouter.get('/getAccounts', utility.getAccounts);
module.exports = utilityRouter;