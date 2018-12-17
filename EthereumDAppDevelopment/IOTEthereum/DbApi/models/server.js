var Web3 = require("web3")
// var web3 = new Web3
// web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

const web3 = new Web3('ws://127.0.0.1:8545');

var http = require('http');
const dbcon = require('./connection_db');
const config = require('../setting/contractConfig');


var DP = new web3.eth.Contract(config.DP.abi, config.DP.address);
var HD = new web3.eth.Contract(config.HD.abi, config.HD.address);
var account = web3.eth.accounts[0];
var retval = {};
module.exports = class Server {
    createContainerEvent(req, res, next) {
        retval.log = 'subscribeCreateContainerEvent';
        let blocknumber;
        web3.eth.getBlockNumber()
            .then(res => blocknumber = res);
        DP.events.deviceCreated({
                // filter: {
                //     myIndexedParam: [20, 23],
                //     myOtherIndexedParam: '0x123456789...'
                // }, 
                fromBlock: blocknumber
            })
            .on('data', function (event) {
                console.log(event.returnValues._deviceid);
                //retval.output = event;

                var sql = `INSERT INTO device_tbl ( device_contract_address,provider_contract_address,hospital_account) VALUES ('${event.returnValues._devicecontractaddress}','${event.returnValues._providercontractaddress}','${event.returnValues._hospitaladdress}');`;
                dbcon.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("1 record inserted");
                });
            })
            .on('changed', function (event) {
                // remove event from local database
            })
            .on('error', console.error);

        res.json({
            result: retval
        });
    };

    updateHealthDataEvent(req, res, next) {
        retval.log = 'subscribeUpdateHealthDataEvent';
        let blocknumber;
        web3.eth.getBlockNumber()
            .then(res => blocknumber = res);
        HD.events.dataUploadEvent({
                // filter: {
                //     myIndexedParam: [20, 23],
                //     myOtherIndexedParam: '0x123456789...'
                // }, 
                fromBlock: blocknumber
            })
            .on('data', function (event) {
                console.log(event.returnValues._heartbeat);
                //retval.output = event;

                var sql = `INSERT INTO transaction_tbl (transaction_hash,heartbeat_data,spo2_data,user_account,device_contract_address) VALUES ('${event.transactionHash}','${event.returnValues._heartbeat}','${event.returnValues._spO2}','${event.returnValues._useraddress}','${event.address}');`;
                dbcon.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("1 record inserted");
                });
            })
            .on('changed', function (event) {
                // remove event from local database
            })
            .on('error', console.error);

        res.json({
            result: retval
        });
    };

};