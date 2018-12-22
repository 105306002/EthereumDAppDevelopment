"use strict";

var Web3 = require('web3');
var web3 = new Web3;
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
const config = require('../setting/contractConfig');
const unlockAccount = require('./unlock');

module.exports = async function addOrUpdateUser(_conttractAddress, _userAddress) {
    //先取得賬號
    //let password = config.geth.password;
    let nowAccount = "";
    await web3.eth.getAccounts((err, res) => {
        nowAccount = res[1]
    });
    //console.log(`nowAccount:${nowAccount}`);

    //let HD = new web3.eth.Contract(config.HD.abi, config.HD.address);
    let HD = new web3.eth.Contract(config.HD.abi, _conttractAddress);
    let result = {};

    //解鎖
    let unlock = await unlockAccount(nowAccount, 'nccu');
    if (!unlock) {
        return;
    }


    return new Promise((resolve, reject) => {
        HD.methods
            .addOrUpdateUser(_userAddress)
            .send({
                from: nowAccount,
                gas: 3400000
            })
            .then(res => {
                result.hospitalAddress = res.events.addOrUpdateUserEvent.returnValues._hospitaladdress;
                result.userAddress = res.events.addOrUpdateUserEvent.returnValues._useraddress;
                result.time = res.events.addOrUpdateUserEvent.returnValues._time;
                resolve(result);

                console.log(result);
            })
            .catch(err => {
                result.status = `contract addOrUpdateUser failed.`;
                result.error = err.toString();
                reject(result);

                console.log(result);
            });
    });
};