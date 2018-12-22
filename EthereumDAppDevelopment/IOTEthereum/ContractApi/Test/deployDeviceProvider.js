"use strict";

const fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3;
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
const dbcon = require('./connection_db');
const DPAbi = JSON.parse(fs.readFileSync('../contract/DeviceProvider.abi').toString());
const DPAddress = fs.readFileSync('../contract/DeviceProviderAddress.txt').toString();
const DPCode = '0x' + fs.readFileSync('../contract/DeviceProvider.bin').toString();
const HDAbi = JSON.parse(fs.readFileSync('../contract/HealthDevice.abi').toString());
const HDAddress = fs.readFileSync('../contract/HealthDeviceAddress.txt').toString();
const HDCode = '0x' + fs.readFileSync('../contract/HealthDevice.bin').toString();
const unlockAccount = require('./unlock');

let DP = new web3.eth.Contract(DPAbi);

let result = {};

web3.eth.getAccounts().then(async function (accounts) {
    let unlock = await unlockAccount(accounts[0], 'nccu');
    if (!unlock) {
        return;
    }
    DP
        .deploy({
            data: DPCode
        })
        .send({
            from: accounts[0],
            gas: 3400000
        })
        .on('error', function (error) {
            result.status = `DeviceProvider contract deploy failed.`;
            result.error = error.toString();


            console.log(result);
            //return;
        })
        .on("receipt", function (receipt) {
            fs.writeFileSync('../contract/DeviceProviderAddress.txt', receipt.contractAddress);
            result.deviceProviderContractAddress = receipt.contractAddress;
            console.log(receipt.contractAddress);

            var sql = `INSERT INTO device_provider_tbl (provider_contract_address, provider_account) VALUES ('${receipt.contractAddress}','${accounts[0]}');`;
            var values = [receipt.contractAddress, accounts[0]];
            dbcon.query(sql, function (err, result) {
                if (err) throw err;
                //console.log("1 record inserted");
            });
        });
});