const express = require('express');
const DeviceController = require('../controllers/deviceController');
var deviceRouter = express.Router();

deviceController = new DeviceController();

deviceRouter.post('/addorupdateuser', deviceController.addOrUpdateUser);
deviceRouter.post('/updatehealthdata', deviceController.updateHealthData);
deviceRouter.get('/getHospitalAddress', deviceController.getHospitalAddress);
deviceRouter.get('/getuseraddress', deviceController.getUserAddress);
//deviceRouter.get('/gethealthdata', deviceController.getHealthData);

module.exports = deviceRouter;