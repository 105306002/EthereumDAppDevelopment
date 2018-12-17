const express = require('express');
const UtilityController = require('../controllers/utilityController');
var utilityRouter = express.Router();

utilityController = new UtilityController();

utilityRouter.post('/deploydeviceprovider', utilityController.deployDeviceProvider);
utilityRouter.post('/deployhealthdevice', utilityController.deployHealthDevice);

module.exports = utilityRouter;