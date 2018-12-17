"use strict";

var Web3 = require('web3');
var web3 = new Web3;
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
const config = require('../setting/contractConfig');
//const unlockAccount = require('../unlock');

module.exports = async function updateHealthData(_userAddress, _heartBeat, _spO2) {
    //module.exports = async function updateHealthData(_userAddress, _data) {
    //先取得賬號
    //let password = config.geth.password;
    // let nowAccount = "";
    // await web3.eth.getAccounts((err, res) => {
    //     nowAccount = res[0]
    // });
    console.log(`userAddress:${_userAddress}`);

    let HD = new web3.eth.Contract(config.HD.abi, config.HD.address);

    let result = {};

    // 解鎖
    // let unlock = await unlockAccount(nowAccount, password);
    // if (!unlock) {
    //     return;
    // }


    return new Promise((resolve, reject) => {
        HD.methods
            .updateHealthData(_heartBeat, _spO2)
            .send({
                from: _userAddress,
                gas: 3400000
            })
            .then(res => {
                result.transactionHash = res.events.dataUploadEvent.transactionHash;
                result.heartBeat = res.events.dataUploadEvent.returnValues._heartbeat;
                result.spO2 = res.events.dataUploadEvent.returnValues._spO2;
                result.userAddress = res.events.dataUploadEvent.returnValues._useraddress;
                result.deviceContractAddress = res.events.dataUploadEvent.address;
                result.time = res.events.dataUploadEvent.returnValues._time;
                resolve(result);

                console.log(result);
            })
            .catch(err => {
                result.status = `contract updateHealthData failed.`;
                result.error = err.toString();
                reject(result);

                console.log(result);
            });
    });

    // return new Promise((resolve, reject) => {
    //     HD.methods
    //         .updateHealthData(_data)
    //         .send({
    //             from: _userAddress,
    //             gas: 3400000
    //         })
    //         .then(res => {
    //             result.userAddress = res.events.dataUploadEvent.returnValues._address;
    //             result.healthdata = res.events.dataUploadEvent.returnValues._data;
    //             result.time = res.events.dataUploadEvent.returnValues._time;
    //             resolve(result);

    //             console.log(result);
    //         })
    //         .catch(err => {
    //             result.status = `contract updateHealthData failed.`;
    //             result.error = err.toString();
    //             reject(result);

    //             console.log(result);
    //         });
    // });
};