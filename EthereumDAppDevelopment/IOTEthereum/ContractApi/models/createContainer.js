"use strict";
const fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3;
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
const config = require('../setting/contractConfig');
const unlockAccount = require('./unlock');

module.exports = async function createContainer(_nowAccount, _deviceId, _hospitalAddress) {
    //先取得賬號
    //let password = config.geth.password;
    // let nowAccount = "";
    // await web3.eth.getAccounts((err, res) => {
    //     nowAccount = res[0]
    // });
    console.log(`nowAccount:${_nowAccount}`);

    let DP = new web3.eth.Contract(config.DP.abi, config.DP.address);

    let result = {};

    // 解鎖
    let unlock = await unlockAccount(_nowAccount, 'nccutest');
    if (!unlock) {
        return;
    }


    return new Promise((resolve, reject) => {
        DP.methods
            .createContainer(_deviceId, _hospitalAddress)
            .send({
                from: _nowAccount,
                gas: 3400000
            })
            .then(res => {
                result.deviceId = res.events.deviceCreated.returnValues._deviceid;
                result.deviceContractAddress = res.events.deviceCreated.returnValues._devicecontractaddress;
                result.providerContractAddress = res.events.deviceCreated.address;
                result.hospitalAddress = res.events.deviceCreated.returnValues._hospitaladdress;
                result.time = res.events.deviceCreated.returnValues._time;
                resolve(result);

                fs.writeFileSync('./contract/HealthDeviceAddress.txt', res.events.deviceCreated.returnValues._devicecontractaddress);
                console.log(result);
            })
            .catch(err => {
                result.status = `contract createContainer failed.`;
                result.error = err.toString();
                reject(result);

                console.log(result);
            });
    });
};