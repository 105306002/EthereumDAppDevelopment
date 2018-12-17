var _addOrUpdateUser = require('../models/addOrUpdateUser');
var _updateHealthData = require('../models/updateHealthData');
var _getDeviceProviderAddress = require('../models/getDeviceProviderAddress');
var _getHealthData = require('../models/getHealthData');
var _getUserAddress = require('../models/getUserAddress');

module.exports = class DeviceController {
    addOrUpdateUser(req, res, next) {
        _addOrUpdateUser(req.body.useraddress)
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
    // updateHealthData(req, res, next) {
    //     _updateHealthData(req.body.useraddress, req.body.data)
    //         .then((result) => {
    //             res.json({
    //                 result: result
    //             })
    //         })
    //         .catch((err) => {
    //             res.json({
    //                 err: err
    //             })
    //         });
    // };
    getDeviceProviderAddress(req, res, next) {
        _getDeviceProviderAddress()
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