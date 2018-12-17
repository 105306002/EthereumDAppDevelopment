var _deployDeviceProvider = require('../models/deployDeviceProvider');
var _deployHealthDevice = require('../models/deployHealthDevice');

module.exports = class UtilityController {
    deployDeviceProvider(req, res, next) {
        _deployDeviceProvider()
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
        _deployHealthDevice()
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