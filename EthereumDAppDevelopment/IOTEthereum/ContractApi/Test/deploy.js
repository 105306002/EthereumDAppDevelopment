const fs = require('fs');
const Web3 = require('web3');

let web3 = new Web3('http://localhost:8545');

const dpabi = JSON.parse(fs.readFileSync('../contract/DeviceProvider.abi').toString());
const dpcode = '0x' + fs.readFileSync('../contract/DeviceProvider.bin').toString();
const hdabi = JSON.parse(fs.readFileSync('../contract/HealthDevice.abi').toString());
const hdcode = '0x' + fs.readFileSync('../contract/HealthDevice.bin').toString();

let DP = new web3.eth.Contract(dpabi);
let HD = new web3.eth.Contract(hdabi);

web3.eth.getAccounts().then(function (accounts) {

    DP
        .deploy({
            data: dpcode
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

            fs.writeFileSync('../contract/DeviceProviderAddress.txt', receipt.contractAddress);
            console.log(`DeviceProvider address:${receipt.contractAddress}`);
            //return;
        });

    HD
        .deploy({
            data: hdcode,
            arguments: [0, accounts[0]]
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