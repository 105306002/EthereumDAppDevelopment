var Web3 = require('web3');
// var web3 = new Web3
// web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

//const web3 = new Web3('http://127.0.0.1:8545');
const web3 = new Web3('ws://localhost:8546');

const connection = require('./connection_db');
const config = require('../setting/contractConfig');

var retval = {};
module.exports = class Server {
    //創建設備時，偵測到事件寫入資料庫
    async createContainerEvent(req, res, next) {
        var DP = new web3.eth.Contract(config.DP.abi, config.DP.address);
        let blocknumber;

        await web3.eth.getBlockNumber((err, res) => (blocknumber = res));

        retval.log = 'subscribeCreateContainerEvent';
        retval.blocknumber = blocknumber;

        await DP.events
            .deviceCreated({
                // filter: {
                //     myIndexedParam: [20, 23],
                //     myOtherIndexedParam: '0x123456789...'
                // },
                fromBlock: blocknumber
            })
            .on('data', function (event) {
                console.log(event);
                //retval.output = event;

                var sql = `delete from device_tbl where device_contract_address='${
                    event.returnValues._devicecontractaddress}'`;

                connection.query(sql, function (error, results, fields) {
                    if (error) {
                        return connection.rollback(function () {
                            throw error;
                        });
                    }
                });
                sql = `INSERT INTO device_tbl ( device_contract_address,provider_contract_address,hospital_account) VALUES ('${
                event.returnValues._devicecontractaddress}','${event.address}','${event.returnValues._hospitaladdress}');`;
                connection.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log('1 record inserted');
                });
            })
            .on('changed', function (event) {
                // remove event from local database
            })
            .on('error', console.error);

        res.json({
            result: retval
        });
    }
    //user上傳健康資料至區塊鏈，偵測到事件寫入資料庫．
    async updateHealthDataEvent(req, res, next) {
        console.log(req.body.contractaddress)
        var HD = new web3.eth.Contract(config.HD.abi, req.body.contractaddress);
        let blocknumber;
        await web3.eth.getBlockNumber().then(res => (blocknumber = res));

        retval.log = 'subscribeUpdateHealthDataEvent';
        retval.blocknumber = blocknumber;

        HD.events
            .dataUploadEvent({
                fromBlock: blocknumber
            })
            .on('data', function (event) {
                console.log(event);

                connection.beginTransaction(function (err) {
                    if (err) {
                        throw err;
                    }
                    var sql = `delete from transaction_tbl where transaction_hash='${event.transactionHash}'`;
                    connection.query(sql, function (error, results, fields) {
                        if (error) {
                            return connection.rollback(function () {
                                throw error;
                            });
                        }
                    });
                    sql = `INSERT INTO transaction_tbl (transaction_hash,heartbeat_data,spo2_data,user_account,device_contract_address) VALUES ('${event.transactionHash}','${event.returnValues._heartbeat}',
                    '${event.returnValues._spO2}','${event.returnValues._useraddress}','${event.address}');`;

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

        res.json({
            result: retval
        });
    }
};