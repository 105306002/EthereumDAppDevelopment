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
const unlockAccount = require('./unlock');


let DP = new web3.eth.Contract(DPAbi, DPAddress);

let result = {};

web3.eth.getAccounts().then(function (accounts) {
    let unlock = unlockAccount(accounts[0], 'nccu');
    if (!unlock) {
        return;
    }

    DP.methods
        .createContainer(91, accounts[1])
        .send({
            from: accounts[0],
            gas: 3400000
        })
        .then(function (res) {
            result.deviceId = res.events.deviceCreated.returnValues._deviceid;
            result.deviceContractAddress = res.events.deviceCreated.returnValues._devicecontractaddress;
            result.providerContractAddress = res.events.deviceCreated.returnValues._providercontractaddress;
            result.hospitalAddress = res.events.deviceCreated.returnValues._hospitaladdress;
            result.time = res.events.deviceCreated.returnValues._time;
            // fs.writeFileSync('../contract/HealthDeviceAddress.txt', res.events.deviceCreated.returnValues._devicecontractaddress);
            console.log(res);
        })
        .catch(err => {
            console.log('error:' + err.returnValues)
        });


    // DP.methods
    //     .createContainer(90, accounts[1])
    //     .send({
    //         from: accounts[0],
    //         gas: 3400000
    //     })
    //     .on('receipt', function (receipt) {
    //         console.log('rec::' + receipt)
    //     }).on('error', console.error);;
});