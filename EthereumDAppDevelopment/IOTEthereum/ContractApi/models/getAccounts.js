"use strict";

var Web3 = require('web3');
var web3 = new Web3;
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
const config = require('../setting/contractConfig');
const unlockAccount = require('./unlock');

module.exports = async function getAccounts() {
    let result = {};

    return new Promise((resolve, reject) => {
        web3.eth.getAccounts()
            .then(ret => {
                result.accounts = ret;
                resolve(result);

                console.log(result);
            })
            .catch(err => {
                result.status = `get accounts failed.`;
                result.error = err.toString();
                reject(result);

                console.log(result);
            });
    });
};