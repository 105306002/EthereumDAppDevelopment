"use strict";

var Web3 = require('web3');
var web3 = new Web3;
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

let result = {};
web3.eth.getAccounts()
    .then(ret => {
        result.accounts = ret;


        console.log(result);
    })
    .catch(err => {
        result.status = `get accounts failed.`;
        result.error = err.toString();
        console.log(result);
    });