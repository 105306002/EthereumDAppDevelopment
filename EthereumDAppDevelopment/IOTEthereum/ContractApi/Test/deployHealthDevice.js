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


let HD = new web3.eth.Contract(HDAbi);

let result = {};

web3.eth.getAccounts().then(function (accounts) {

    HD
        .deploy({
            data: HDCode,
            arguments: [0, accounts[0]]
        })
        .send({
            from: nowAccount,
            gas: 3400000
        })
        .on('error', function (error) {
            result.status = `HealthDevice contract deploy failed.`;
            result.error = err.toString();
            //reject(result);

            console.log(result);
            //return;
        })
        .on("receipt", function (receipt) {
            result.healthDeviceContractAddress = receipt.contractAddress;
            //resolve(result);

            console.log(result);
        });
});