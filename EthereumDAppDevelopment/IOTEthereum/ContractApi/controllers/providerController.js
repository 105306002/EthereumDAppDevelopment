var _createContainer = require('../models/createContainer');
var _countDeviceIDs = require('../models/countDeviceIDs');
var _getAddress = require('../models/getAddress');
var _getDeviceIDs = require('../models/getDeviceIDs');


module.exports = class ProviderController {
    createContainer(req, res, next) {
        _createContainer(parseInt(req.body.deviceid), req.body.hospitaladdress)
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
    countDeviceIDs(req, res, next) {
        _countDeviceIDs()
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
    getAddress(req, res, next) {
        _getAddress(parseInt(req.params.deviceid))
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
    getDeviceIDs(req, res, next) {
        _getDeviceIDs()
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