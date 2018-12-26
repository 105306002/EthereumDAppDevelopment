var _deployDeviceProvider = require('../models/deployDeviceProvider');
var _deployHealthDevice = require('../models/deployHealthDevice');
var _getAccounts = require('../models/getAccounts');
module.exports = class UtilityController {
    deployDeviceProvider(req, res, next) {
        _deployDeviceProvider(req.body.nowaccount)
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

    getAccounts(req, res, next) {
        _getAccounts()
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
    deployHealthDevice(req, res, next) {
        _deployHealthDevice(req.body.nowaccount)
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