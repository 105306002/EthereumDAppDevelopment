"use strict";
const fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3;
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

const DPAbi = JSON.parse(fs.readFileSync('../contract/DeviceProvider.abi').toString());
const DPAddress = fs.readFileSync('../contract/DeviceProviderAddress.txt').toString();
const DPCode = '0x' + fs.readFileSync('../contract/DeviceProvider.bin').toString();
const HDAbi = JSON.parse(fs.readFileSync('../contract/HealthDevice.abi').toString());
const HDAddress = fs.readFileSync('../contract/HealthDeviceAddress.txt').toString();
const HDCode = '0x' + fs.readFileSync('../contract/HealthDevice.bin').toString();


let HD = new web3.eth.Contract(HDAbi, HDAddress);

let result = {};

web3.eth.getAccounts().then(function (accounts) {
    HD.methods
        .addOrUpdateUser(accounts[2])
        .send({
            from: accounts[1],
            gas: 3400000
        })
        .then(res => {
            result.hospitalAddress = res.events.addOrUpdateUserEvent.returnValues._hospitaladdress;
            result.userAddress = res.events.addOrUpdateUserEvent.returnValues._useraddress;
            result.time = res.events.addOrUpdateUserEvent.returnValues._time;
            //resolve(result);

            console.log(result);
        })
        .catch(err => {
            result.status = `contract addOrUpdateUser failed.`;
            result.error = err.toString();
            //reject(result);

            console.log(result);
        });
});