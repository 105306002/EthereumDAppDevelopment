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



let DP = new web3.eth.Contract(DPAbi, DPAddress);

let result = {};

web3.eth.getAccounts().then(function (accounts) {
    DP.methods
        .createContainer(419, accounts[1])
        .send({
            from: accounts[0],
            gas: 3400000
        })
        .then(res => {
            result.deviceId = res.events.deviceCreated.returnValues._deviceid;
            result.deviceContractAddress = res.events.deviceCreated.returnValues._devicecontractaddress;
            result.providerContractAddress = res.events.deviceCreated.returnValues._providercontractaddress;
            result.hospitalAddress = res.events.deviceCreated.returnValues._hospitaladdress;
            result.time = res.events.deviceCreated.returnValues._time;
            //resolve(result);

            // fs.writeFileSync('../contract/HealthDeviceAddress.txt', res.events.deviceCreated.returnValues._devicecontractaddress);
            console.log(result);
        })
        .catch(err => {
            result.status = `contract createContainer failed.`;
            result.error = err.toString();
            //reject(result);

            console.log(result);
        });
});