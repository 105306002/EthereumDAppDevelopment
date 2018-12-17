const dbcon = require('./connection_db');

module.exports = class Client {
    getUserData(req, res, next) {
        dbcon.query("SELECT * FROM user_data_tbl", function (err, retval, fields) {
            if (err) throw err;

            res.json({
                result: retval
            });
        });
    };
    getDeviceData(req, res, next) {
        dbcon.query("SELECT * FROM device_tbl", function (err, retval, fields) {
            if (err) throw err;

            res.json({
                result: retval
            });
        });
    };
    getHealthDataByUserAccount(req, res, next) {
        dbcon.query(`SELECT * from user_data_tbl as a  join transaction_tbl as b on a.user_account = b.user_account where b.user_account='${req.params.useraccount}' and b.device_contract_address='${req.params.devicecontractaddress}'`, function (err, retval, fields) {
            if (err) throw err;

            res.json({
                result: retval
            });
        });
    };
    getHealthDataByUserAccount2(req, res, next) {
        dbcon.query(`SELECT * from user_data_tbl as a INNER  join transaction_tbl as b on a.user_account = b.user_account`, function (err, retval, fields) {
            if (err) throw err;

            res.json({
                result: retval
            });
        });
    };
};