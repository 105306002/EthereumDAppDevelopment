const express = require('express');
const ProviderController = require('../controllers/providerController');
var providerRouter = express.Router();

providerController = new ProviderController();

providerRouter.post('/createcontainer', providerController.createContainer);
providerRouter.get('/countdeviceids', providerController.countDeviceIDs);
providerRouter.get('/getaddress/:deviceid', providerController.getAddress);
providerRouter.get('/getdeviceids', providerController.getDeviceIDs);

module.exports = providerRouter;