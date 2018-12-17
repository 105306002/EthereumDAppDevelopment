const fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
var http = require('http');
//const db = require('./connection_db');
const DPAbi = JSON.parse(fs.readFileSync('../contract/DeviceProvider.abi').toString());
const DPAddress = fs.readFileSync('../contract/DeviceProviderAddress.txt').toString();


var DP = new web3.eth.Contract(DPAbi, DPAddress);

// var ClientReceipt = web3.eth.Contract(DPAbi);
// var clientReceipt = ClientReceipt.at(DPAddress);
// var account = web3.eth.accounts[0];


// var myEvent = DP.deviceCreated();
// myEvent.watch(function (err, result) {
//     if (!err) {
//         console.log(result);
//     }
// });

DP.events.deviceCreated({
        // filter: {
        //     myIndexedParam: [20, 23],
        //     myOtherIndexedParam: '0x123456789...'
        // }, 
        fromBlock: 0
    }, function (error, event) {
        console.log(event);
    })
    .on('data', function (event) {
        console.log(event); // same results as the optional callback above
    })
    .on('changed', function (event) {
        // remove event from local database
    })
    .on('error', console.error);

web3.eth.getAccounts().then(function (accounts) {
    DP.methods
        .createContainer(300, accounts[1])
        .send({
            from: accounts[0],
            gas: 3400000
        })

});
DP.events.deviceCreated({
        // filter: {
        //     myIndexedParam: [20, 23],
        //     myOtherIndexedParam: '0x123456789...'
        // }, 
        fromBlock: 0
    }, function (error, event) {
        console.log(event);
    })
    .on('data', function (event) {
        console.log(event); // same results as the optional callback above
    })
    .on('changed', function (event) {
        // remove event from local database
    })
    .on('error', console.error);


// DP.getPastEvents('deviceCreated', {
//         // filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
//         fromBlock: 0,
//         toBlock: 'latest'
//     }, function (error, events) {
//         console.log(events);
//     })
//     .then(function (events) {
//         console.log(events) // same results as the optional callback above
//     });