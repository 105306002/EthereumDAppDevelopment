"use strict";
const fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3;
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

module.exports = class Utility {
    async getAccounts(req, res, next) {
        let result = {};
        web3.eth.getAccounts()
            .then(ret => {
                result.accounts = ret;
                console.log(result);
                res.json({
                    result: result
                });
            })
            .catch(err => {
                result.status = `get accounts failed.`;
                result.error = err.toString();
                console.log(result);
                res.json({
                    result: result
                });
            });
    }
}