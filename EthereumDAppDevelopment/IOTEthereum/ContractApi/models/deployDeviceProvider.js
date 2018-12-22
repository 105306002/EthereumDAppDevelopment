"use strict";

const fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3;
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
const config = require('../setting/contractConfig');
const unlockAccount = require('./unlock');

module.exports = async function deployDeviceProvider() {
    //先取得賬號
    //let password = config.geth.password;
    let nowAccount = "";
    await web3.eth.getAccounts((err, res) => {
        nowAccount = res[0];
    });
    console.log(`nowAccount:${nowAccount}`);

    let DP = new web3.eth.Contract(config.DP.abi);

    let result = {};

    // 解鎖
    let unlock = await unlockAccount(nowAccount, 'nccu');
    if (!unlock) {
        return;
    }

    return new Promise((resolve, reject) => {
        DP
            .deploy({
                data: config.DP.bytecode
            })
            .send({
                from: nowAccount,
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