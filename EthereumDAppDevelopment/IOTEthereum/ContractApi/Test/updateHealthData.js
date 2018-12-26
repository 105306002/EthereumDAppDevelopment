'use strict';
const fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'));

const DPAbi = JSON.parse(
  fs.readFileSync('../contract/DeviceProvider.abi').toString()
);
const DPAddress = fs
  .readFileSync('../contract/DeviceProviderAddress.txt')
  .toString();
const DPCode =
  '0x' + fs.readFileSync('../contract/DeviceProvider.bin').toString();
const HDAbi = JSON.parse(
  fs.readFileSync('../contract/HealthDevice.abi').toString()
);
const HDAddress = fs
  .readFileSync('../contract/HealthDeviceAddress.txt')
  .toString();
const HDCode =
  '0x' + fs.readFileSync('../contract/HealthDevice.bin').toString();
const unlockAccount = require('./unlock');

let HD = new web3.eth.Contract(HDAbi, HDAddress);

let result = {};

web3.eth.getAccounts().then(async function (accounts) {
  let unlock = await unlockAccount(accounts[2], 'nccutest');
  if (!unlock) {
    return;
  }
  HD.methods
    .updateHealthData(98, 110)
    .send({
      from: accounts[2],
      gas: 3400000
    })
    .then(res => {
      result.transactionHash = res.events.dataUploadEvent.transactionHash;
      result.heartBeat = res.events.dataUploadEvent.returnValues._heartbeat;
      result.spO2 = res.events.dataUploadEvent.returnValues._spO2;
      result.userAddress = res.events.dataUploadEvent.returnValues._useraddress;
      result.deviceContractAddress = res.events.dataUploadEvent.address;
      result.time = res.events.dataUploadEvent.returnValues._time;
      //resolve(result);

      console.log(result);
    })
    .catch(err => {
      result.status = `contract updateHealthData failed.`;
      result.error = err.toString();
      //reject(result);

      console.log(result);
    });
});