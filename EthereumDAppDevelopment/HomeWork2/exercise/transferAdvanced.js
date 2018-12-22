const fs = require('fs');
const Web3 = require('/Users/tsaimingjhe/.nvm/versions/node/v11.0.0/lib/node_modules/web3');

let web3 = new Web3('http://localhost:8545');

const abi = JSON.parse(fs.readFileSync('../bin/Bank.abi').toString());
const address = fs.readFileSync('../address.txt').toString();

let bank = new web3.eth.Contract(abi, address);

web3.eth.getAccounts().then(async function (accounts) {

    const fromAddress = await accounts[0];
    const toAddress = await accounts[1];
    var transferAmount = await web3.utils.toWei('1', 'ether');

    var totalGas;
    await bank.methods.transferAdvanced(toAddress, transferAmount).estimateGas({
            from: fromAddress
        })
        .then(function (gasAmount) {
            totalGas = gasAmount;
        })
        .catch(function (error) {
            console.log(error)
        });

    var realAmount = await web3.utils.toWei(`${transferAmount - totalGas}`, 'wei');

    bank.methods.transferAdvanced(toAddress, realAmount).send({
            from: fromAddress,
            gas: 340000
        })
        .then(function (res) {
            console.log(res)
        })
        .catch(function (error) {
            console.log(error)
        });

});