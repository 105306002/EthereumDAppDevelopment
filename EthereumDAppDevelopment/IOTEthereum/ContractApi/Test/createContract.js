"use strict";
const fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3;
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));


const SpData = require('../contract/ServiceProvider.json');
const SpAddress = fs.readFileSync('../contract/ServiceProviderAddress.txt').toString();

const unlockAccount = require('./unlock');

let SP = new web3.eth.Contract(SpData.abi, SpAddress);

let result = {};

web3.eth.getAccounts().then(async function (accounts) {
    let unlock = await unlockAccount(accounts[1], 'nccutest');
    if (!unlock) {
        return;
    }
    let userId = await web3.utils.sha3('A123456789');
    //console.log(userId)
    SP.methods
        .createContract(userId, '666')
        .send({
            from: accounts[1],
            gas: 3400000
        })
        .then(res => {
            result.userId = res.events.contractCreated.returnValues.userId;
            result.deviceId = res.events.contractCreated.returnValues.deviceId;
            result.contractAddress = res.events.contractCreated.returnValues.contractAddress;
            fs.writeFileSync('../contract/HealthRecordAddress.txt', res.events.contractCreated.returnValues.contractAddress);
            console.log(res);
        })
        .catch(err => {
            result.status = `contract createContract failed.`;
            result.error = err.toString();

            console.log(result);
        });
});