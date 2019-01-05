"use strict";
const fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3;
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));


const SpData = require('../contract/ServiceProvider.json');
const SpAddress = fs.readFileSync('./contract/ServiceProviderAddress.txt').toString();
const HrData = require('../contract/HealthRecord.json');

const unlockAccount = require('./unlock');

let SP = new web3.eth.Contract(SpData.abi, SpAddress);

module.exports = class ServiceProvider {
    async addParticipant(req, res, next) {
        let result = {};
        let unlock = await unlockAccount(req.body.serviceProviderAddress, 'nccutest');
        if (!unlock) {
            return;
        }

        await SP.methods
            .addParticipant(req.body.newParticipantAddress)
            .send({
                from: req.body.serviceProviderAddress,
                gas: 3400000
            })
            .then(res => {
                result.newParticipant = res.events.participantAdded.returnValues.newParticipant;
                console.log(result);
            })
            .catch(err => {
                result.status = `contract addParticipant failed.`;
                result.error = err.toString();
                console.log(result);
            });
        res.json({
            result: result
        });
    }

    async createContract(req, res, next) {
        let result = {};

        let unlock = await unlockAccount(req.body.hospitalAddress, 'nccutest');
        if (!unlock) {
            return;
        }
        //let userId = await web3.utils.sha3(req.body.userId);

        await SP.methods
            .createContract(req.body.userId, req.body.deviceId)
            .send({
                from: req.body.hospitalAddress,
                gas: 3400000
            })
            .then(res => {
                result.userId = res.events.contractCreated.returnValues.userId;
                result.deviceId = res.events.contractCreated.returnValues.deviceId;
                result.contractAddress = res.events.contractCreated.returnValues.contractAddress;
                console.log(res);
            })
            .catch(err => {
                result.status = `contract createContract failed.`;
                result.error = err.toString();
                console.log(result);

            });
        res.json({
            result: result
        });
    }
    async getContractDataByDeviceId(req, res, next) {
        let result = {};
        await SP.methods
            .getContractDataByDeviceId(req.params.deviceid)
            .call()
            .then(res => {
                result.hospitalAddress = res.hospitalAddress;
                result.contractAddress = res.contractAddress;
                console.log(result);
            })
            .catch(err => {
                result.status = `contract getContractAddressByDeviceId failed.`;
                result.error = err.toString();
                console.log(result);
            });
        res.json({
            result: result
        });
    }
}