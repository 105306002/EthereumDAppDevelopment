"use strict";
const fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3;
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));


const SpData = require('../contract/ServiceProvider.json');
const SpAddress = fs.readFileSync('../contract/ServiceProviderAddress.txt').toString();
const HrData = require('../contract/HealthRecord.json');
//const HrAddress = fs.readFileSync('../contract/HealthRecordAddress.txt').toString();

const unlockAccount = require('./unlock');

let SP = new web3.eth.Contract(SpData.abi, SpAddress);

let result = {};

web3.eth.getAccounts().then(async function (accounts) {

    let HrAddress = '';
    let hospitalAddress = '';
    await SP.methods
        .getContractDataByDeviceId('666')
        .call()
        .then(res => {
            hospitalAddress = res.hospitalAddress;
            HrAddress = res.contractAddress;
            console.log(res)
        })
        .catch(err => {
            console.log(err);
        });

    let HR = new web3.eth.Contract(HrData.abi, HrAddress);
    let unlock = await unlockAccount(hospitalAddress, 'nccutest');
    if (!unlock) {
        return;
    }
    HR.methods
        .updateHealthData(34, 155)
        .send({
            from: hospitalAddress,
            gas: 3400000
        })
        .then(res => {
            result.userId = res.events.dataUploadEvent.returnValues.userId;
            result.contractAddress = res.events.dataUploadEvent.address;
            result.heartbeat = res.events.dataUploadEvent.returnValues.heartBeat;
            result.spO2 = res.events.dataUploadEvent.returnValues.spO2;
            console.log(result);
        })
        .catch(err => {
            result.status = `contract updateHealthData failed.`;
            result.error = err.toString();

            console.log(result);
        });
});