"use strict";
var Web3 = require('web3');
var web3 = new Web3;
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

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
    async getContractData(req, res, next) {
        dbcon.query("SELECT * FROM contract_data", function (err, retval, fields) {
            if (err) throw err;

            res.json({
                result: retval
            });
        });
    };

    async getHealthDataByUserAccountDesc(req, res, next) {
        //let userId = await web3.utils.sha3(req.params.userId);

        dbcon.query(`SELECT transaction_hash,user_id,contract_address,heartbeat_data,spo2_data,FROM_UNIXTIME(update_date, '%Y-%m-%d %H:%i:%s') as update_date from transaction_tbl nolock where user_id='${req.params.userId}' and contract_address='${req.params.contractAddress}' ORDER by update_date desc limit 30`, function (err, retval, fields) {
            if (err) throw err;

            res.json({
                result: retval
            });
        });
    };
};