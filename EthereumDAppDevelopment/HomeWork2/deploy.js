const fs = require('fs');
const Web3 = require('/Users/tsaimingjhe/.nvm/versions/node/v11.0.0/lib/node_modules/web3');

let web3 = new Web3('http://localhost:8545');

const abi = JSON.parse(fs.readFileSync('./bin/Bank.abi').toString());
const bytecode = '0x' + fs.readFileSync('./bin/Bank.bin').toString();

let bank = new web3.eth.Contract(abi);

web3.eth.getAccounts().then(function (accounts) {

    bank
        .deploy({
            data: bytecode
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
            console.log(receipt);
            //console.log(`receipt:${receipt}`);
            fs.writeFileSync('./address.txt', receipt.contractAddress);
            console.log(`contract address:${receipt.contractAddress}`);
            return;
        });
});