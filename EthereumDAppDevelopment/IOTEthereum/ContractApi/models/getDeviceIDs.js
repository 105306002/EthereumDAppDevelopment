"use strict";

var Web3 = require('web3');
var web3 = new Web3;
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
const config = require('../setting/contractConfig');
const unlockAccount = require('./unlock');

module.exports = async function getDeviceIDs() {

    let DP = new web3.eth.Contract(config.DP.abi, config.DP.address);

    let result = {};

    return new Promise((resolve, reject) => {
        DP.methods
            .getDeviceIDs()
            .call()
            .then(res => {
                result.deviceIDs = res;
                resolve(result);

                console.log(result);
            })
            .catch(err => {
                result.status = `contract getDeviceIDs failed.`;
                result.error = err.toString();
                reject(result);

                console.log(result);
            });
    });
};