"use strict";

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
        .getAddress('168')
        .call({
            from: accounts[0]
        })
        .then(res => {
            result.deviceAddress = res;
            //resolve(result);

            console.log(result);
        })
        .catch(err => {
            result.status = `contract getAddress failed.`;
            result.error = err.toString();
            //reject(result);

            console.log(result);
        });
});