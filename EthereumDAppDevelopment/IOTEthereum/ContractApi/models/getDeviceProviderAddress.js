"use strict";

var Web3 = require('web3');
var web3 = new Web3;
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
const config = require('../setting/contractConfig');
//const unlockAccount = require('../unlock');

module.exports = async function getDeviceProviderAddress() {
    //先取得賬號
    //let password = config.geth.password;
    let nowAccount = "";
    await web3.eth.getAccounts((err, res) => {
        nowAccount = res[0]
    });
    console.log(`nowAccount:${nowAccount}`);

    let HD = new web3.eth.Contract(config.HD.abi, config.HD.address);

    let result = {};

    // 解鎖
    // let unlock = await unlockAccount(nowAccount, password);
    // if (!unlock) {
    //     return;
    // }

    return new Promise((resolve, reject) => {
        HD.methods
            .getDeviceProviderAddress()
            .call({
                from: nowAccount
            })
            .then(res => {
                result.deviceProviderAddress = res;
                resolve(result);

                console.log(result);
            })
            .catch(err => {
                result.status = `contract getDeviceProviderAddress failed.`;
                result.error = err.toString();
                reject(result);

                console.log(result);
            });
    });
};