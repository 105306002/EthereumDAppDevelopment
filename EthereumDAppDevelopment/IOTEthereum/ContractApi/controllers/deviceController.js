var _addOrUpdateUser = require('../models/addOrUpdateUser');
var _updateHealthData = require('../models/updateHealthData');
var _getHospitalAddress = require('../models/getHospitalAddress');
var _getHealthData = require('../models/getHealthData');
var _getUserAddress = require('../models/getUserAddress');

module.exports = class DeviceController {
    addOrUpdateUser(req, res, next) {
        _addOrUpdateUser(req.body.nowaccount, req.body.contractaddress, req.body.useraddress)
            .then((result) => {
                res.json({
                    result: result
                })
            })
            .catch((err) => {
                res.json({
                    err: err
                })
            });
    };
    updateHealthData(req, res, next) {
        _updateHealthData(req.body.useraddress, parseInt(req.body.heartbeat), parseInt(req.body.spo2))
            .then((result) => {
                res.json({
                    result: result
                })
            })
            .catch((err) => {
                res.json({
                    err: err
                })
            });
    };

    getHospitalAddress(req, res, next) {
        _getHospitalAddress()
            .then((result) => {
                res.json({
                    result: result
                })
            })
            .catch((err) => {
                res.json({
                    err: err
                })
            });
    };
    getHealthData(req, res, next) {
        _getHealthData()
            .then((result) => {
                res.json({
                    result: result
                })
            })
            .catch((err) => {
                res.json({
                    err: err
                })
            });
    };
    getUserAddress(req, res, next) {
        _getUserAddress()
            .then((result) => {
                res.json({
                    result: result
                })
            })
            .catch((err) => {
                res.json({
                    err: err
                })
            });
    };
};