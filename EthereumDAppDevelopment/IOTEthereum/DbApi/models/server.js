var Web3 = require('web3');
const fs = require('fs');

//const web3 = new Web3('ws://127.0.0.1:8545');
const web3 = new Web3('ws://localhost:8546');

const connection = require('./connection_db');
const SpData = require('../contract/ServiceProvider.json');
const HrData = require('../contract/HealthRecord.json');
const SpAddress = fs
    .readFileSync('./contract/ServiceProviderAddress.txt')
    .toString();

var retval = {};
module.exports = class Server {
    //創建設備時，偵測到事件寫入資料庫
    async createContractEvent() {
        var SP = new web3.eth.Contract(SpData.abi, SpAddress);
        let blocknumber;

        await web3.eth.getBlockNumber((err, number) => (blocknumber = number));

        retval.log = 'subscribeCreateContractEvent';
        retval.blocknumber = blocknumber;
        console.log(retval)
        await SP.events
            .contractCreated({
                fromBlock: blocknumber
            })
            .on('data', function (event) {
                console.log(event);

                var sql = `delete from contract_data where contract_address='${
          event.returnValues.contractAddress
        }'`;

                connection.query(sql, function (error, results, fields) {
                    if (error) {
                        throw error;
                    }
                });
                sql = `update contract_data set due_date=now() where device_id=${
          event.returnValues.deviceId
        }`;
                connection.query(sql, function (error, results, fields) {
                    if (error) {
                        throw error;
                    }
                });

                sql = `INSERT INTO contract_data ( device_id,contract_address,start_date,due_date) VALUES ('${
          event.returnValues.deviceId
        }','${event.returnValues.contractAddress}',now(),'9999-12-31');`;
                connection.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log('1 record inserted');
                });
            })
            .on('changed', function (event) {
                // remove event from local database
            })
            .on('error', console.error);

        // res.json({
        //   result: retval
        // });
    }
    //user上傳健康資料至區塊鏈，偵測到事件寫入資料庫．
    async updateHealthDataEvent(req, res, next) {
        console.log(req.body.contractAddress);
        var HR = new web3.eth.Contract(HrData.abi, req.body.contractAddress);
        let blocknumber;
        await web3.eth.getBlockNumber().then(res => (blocknumber = res));

        retval.log = 'subscribeUpdateHealthDataEvent';
        retval.blocknumber = blocknumber;

        HR.events
            .dataUploadEvent({
                fromBlock: blocknumber
            })
            .on('data', function (event) {
                console.log(event);

                connection.beginTransaction(function (err) {
                    if (err) {
                        throw err;
                    }
                    var sql = `delete from transaction_tbl where transaction_hash='${
            event.transactionHash
          }'`;
                    connection.query(sql, function (error, results, fields) {
                        if (error) {
                            return connection.rollback(function () {
                                throw error;
                            });
                        }
                    });
                    sql = `INSERT INTO transaction_tbl (transaction_hash,user_id,contract_address,heartbeat_data,spo2_data) VALUES ('${
            event.transactionHash
          }','${event.returnValues.userId}','${event.address}','${
            event.returnValues.heartBeat
          }','${event.returnValues.spO2}');`;

                    connection.query(sql, function (error, results, fields) {
                        if (error) {
                            return connection.rollback(function () {
                                throw error;
                            });
                        }
                        connection.commit(function (err) {
                            if (err) {
                                return connection.rollback(function () {
                                    throw err;
                                });
                            }
                            console.log('success!');
                        });
                    });
                });
            })
            .on('changed', function (event) {
                // remove event from local database
            })
            .on('error', console.error);

        // res.json({
        //     result: retval
        // });
    }
};