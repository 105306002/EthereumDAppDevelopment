const dbcon = require('./connection_db');

module.exports = class Client {
    async getUserData(req, res, next) {
        dbcon.query("SELECT * FROM user_data_tbl", function (err, retval, fields) {
            if (err) throw err;

            res.json({
                result: retval
            });
        });
    };
    async getDeviceData(req, res, next) {
        dbcon.query("SELECT * FROM device_tbl", function (err, retval, fields) {
            if (err) throw err;

            res.json({
                result: retval
            });
        });
    };
    async getHealthDataByUserAccount(req, res, next) {
        dbcon.query(`SELECT * from user_data_tbl as a  join transaction_tbl as b on a.user_account = b.user_account where b.user_account='${req.params.useraccount}' and b.device_contract_address='${req.params.devicecontractaddress}'`, function (err, retval, fields) {
            if (err) throw err;

            res.json({
                result: retval
            });
        });
    };
    async getHealthDataByUserAccountAsc(req, res, next) {
        dbcon.query(`SELECT * from transaction_tbl nolock where user_account='${req.params.useraccount}' and device_contract_address='${req.params.devicecontractaddress}' ORDER by update_date limit 20`, function (err, retval, fields) {
            if (err) throw err;

            res.json({
                result: retval
            });
        });
    };
    async getHealthDataByUserAccountDesc(req, res, next) {
        dbcon.query(`SELECT * from transaction_tbl nolock where user_account='${req.params.useraccount}' and device_contract_address='${req.params.devicecontractaddress}' ORDER by update_date desc limit 30`, function (err, retval, fields) {
            if (err) throw err;

            res.json({
                result: retval
            });
        });

        // connection.beginTransaction(function (err) {
        //     if (err) {
        //         throw err;
        //     }
        //     var sql = `SELECT * from transaction_tbl nolock where user_account='${req.params.useraccount}' and device_contract_address='${req.params.devicecontractaddress}' ORDER by update_date desc limit 20`;
        //     connection.query(sql, function (error, results, fields) {
        //         if (error) {
        //             return connection.rollback(function () {
        //                 throw error;
        //             });
        //         }

        //         connection.commit(function (err, retval) {
        //             if (err) {
        //                 return connection.rollback(function () {
        //                     throw err;
        //                 });
        //             }
        //             res.json({
        //                 result: retval
        //             });
        //             console.log('success!');
        //         });
        //     });
        // });
    };
};