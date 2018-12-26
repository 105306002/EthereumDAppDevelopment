"use strict";

const fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3;
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
const config = require('../setting/contractConfig');
const unlockAccount = require('./unlock');

module.exports = async function deployDeviceProvider(_nowAccount) {
    //先取得賬號

    console.log(`nowAccount:${_nowAccount}`);

    let DP = new web3.eth.Contract(config.DP.abi);

    let result = {};

    // 解鎖
    let unlock = await unlockAccount(_nowAccount, 'nccutest');
    if (!unlock) {
        return;
    }

    return new Promise((resolve, reject) => {
        DP
            .deploy({
                data: config.DP.bytecode
            })
            .send({
                from: _nowAccount,
                gas: 3400000
            })
            .on('error', function (error) {
                result.status = `DeviceProvider contract deploy failed.`;
                result.error = error.toString();
                reject(result);

                console.log(result);
                //return;
            })
            .on("receipt", function (receipt) {
                fs.writeFileSync('./contract/DeviceProviderAddress.txt', receipt.contractAddress);
                result.deviceProviderContractAddress = receipt.contractAddress;
                resolve(result);

                console.log(result);
            });
    });
};