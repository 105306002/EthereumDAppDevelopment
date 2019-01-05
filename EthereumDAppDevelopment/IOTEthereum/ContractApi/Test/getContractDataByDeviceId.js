"use strict";
const fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3;
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

const SpData = require('../contract/ServiceProvider.json');
const SpAddress = fs.readFileSync('../contract/ServiceProviderAddress.txt').toString();

let SP = new web3.eth.Contract(SpData.abi, SpAddress);

let result = {};

web3.eth.getAccounts().then(async function (accounts) {

    SP.methods
        .getContractDataByDeviceId('666')
        .call()
        .then(res => {
            result.hospitalAddress = res.hospitalAddress;
            result.contractAddress = res.contractAddress;
            console.log(res);
        })
        .catch(err => {
            result.status = `contract getContractAddressByDeviceId failed.`;
            result.error = err.toString();
            console.log(result);
        });
});