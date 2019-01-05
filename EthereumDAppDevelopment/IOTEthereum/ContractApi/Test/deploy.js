const fs = require('fs');
const Web3 = require('web3');

let web3 = new Web3('http://localhost:8545');

const unlockAccount = require('./unlock');

const SpData = require('../contract/ServiceProvider.json');
const HrData = require('../contract/HealthRecord.json');

let SP = new web3.eth.Contract(SpData.abi);
let HR = new web3.eth.Contract(HrData.abi);

web3.eth.getAccounts().then(async function (accounts) {
    let unlock = await unlockAccount(accounts[0], 'nccutest');
    if (!unlock) {
        return;
    }

    SP
        .deploy({
            data: SpData.bytecode
        })
        .send({
            from: accounts[0],
            gas: 3400000
        })
        .on('error', function (error) {
            console.log(`deploy failed:${error}`);
            return;
        })
        .on("receipt", function (receipt) {

            fs.writeFileSync('../contract/ServiceProviderAddress.txt', receipt.contractAddress);
            console.log('ServiceProviderAddress:' + receipt.contractAddress);
        });

    HR
        .deploy({
            data: HrData.bytecode,
            arguments: ['0']
        })
        .send({
            from: accounts[0],
            gas: 3400000
        })
        .on('error', function (error) {
            console.log(`deploy failed:${error}`);
            return;
        })
        .on("receipt", function (receipt) {
            //console.log(receipt);
            //fs.writeFileSync('./HealthDeviceAddress.txt', receipt.contractAddress);
            console.log(`HealthDevice address:${receipt.contractAddress}`);
            //return;
        });

});