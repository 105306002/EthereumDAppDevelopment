"use strict";

var Web3 = require('web3');
var web3 = new Web3;
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
const config = require('../setting/contractConfig');
const unlockAccount = require('./unlock');

module.exports = async function getUserAddress() {

    let HD = new web3.eth.Contract(config.HD.abi, config.HD.address);

    let result = {};


    return new Promise((resolve, reject) => {
        HD.methods
            .getUserAddress()
            .call()
            .then(res => {
                result.userAddress = res;
                resolve(result);

                console.log(result);
            })
            .catch(err => {
                result.status = `contract getUserAddress failed.`;
                result.error = err.toString();
                reject(result);

                console.log(result);
            });
    });
};