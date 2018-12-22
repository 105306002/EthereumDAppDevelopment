"use strict";

var Web3 = require("web3");
var web3 = new Web3;
/*var net = require('net');
web3.setProvider("\\\\.\\pipe\\geth.ipc", net);*/
web3.setProvider('http://localhost:8545');

module.exports = async function unlockAccount(nowAccount, password) {

    console.log(`nowAccount: ${nowAccount} `);

    return web3.eth.personal
        .unlockAccount(nowAccount, password, 9999)
        .then(function (result) {
            console.log("account已解鎖");
            return true;
        })
        .catch(function (err) {
            console.log("account密碼輸入錯誤");
            return false;
        });
};