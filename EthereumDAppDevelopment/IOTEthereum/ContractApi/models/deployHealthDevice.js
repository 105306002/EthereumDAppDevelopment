"use strict";

const fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3;
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
const config = require('../setting/contractConfig');
const unlockAccount = require('./unlock');

module.exports = async function deployHealthDevice(_nowAccount) {
    //先取得賬號

    console.log(`nowAccount:${_nowAccount}`);

    let HD = new web3.eth.Contract(config.HD.abi);

    let result = {};

    // 解鎖
    let unlock = await unlockAccount(_nowAccount, 'nccutest');
    if (!unlock) {
        return;
    }

    return new Promise((resolve, reject) => {

        HD
            .deploy({
                data: config.HD.bytecode,
                arguments: [0, _nowAccount]
            })
            .send({
                from: _nowAccount,
                gas: 3400000
            })
            .on('error', function (error) {
                result.status = `HealthDevice contract deploy failed.`;
                result.error = err.toString();
                reject(result);

                console.log(result);
                //return;
            })
            .on("receipt", function (receipt) {
                result.healthDeviceContractAddress = receipt.contractAddress;
                resolve(result);

                console.log(result);
            });
    });
};