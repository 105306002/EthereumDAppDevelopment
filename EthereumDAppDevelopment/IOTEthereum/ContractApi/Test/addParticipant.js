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
    let unlock = await unlockAccount(accounts[0], 'nccutest');
    if (!unlock) {
        return;
    }

    SP.methods
        .addParticipant(accounts[1])
        .send({
            from: accounts[0],
            gas: 3400000
        })
        .then(res => {
            result.newParticipant = res.events.participantAdded.returnValues.newParticipant;
            console.log(result);
        })
        .catch(err => {
            result.status = `contract addParticipant failed.`;
            result.error = err.toString();

            console.log(result);
        });
});