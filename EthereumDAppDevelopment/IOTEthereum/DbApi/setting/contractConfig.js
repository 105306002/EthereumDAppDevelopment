const fs = require('fs');

const DPAbi = JSON.parse(fs.readFileSync('./contract/DeviceProvider.abi').toString());
const DPAddress = fs.readFileSync('./contract/DeviceProviderAddress.txt').toString();
const DPCode = '0x' + fs.readFileSync('./contract/DeviceProvider.bin').toString();
const HDAbi = JSON.parse(fs.readFileSync('./contract/HealthDevice.abi').toString());
const HDAddress = fs.readFileSync('./contract/HealthDeviceAddress.txt').toString();
const HDCode = '0x' + fs.readFileSync('./contract/HealthDevice.bin').toString();

module.exports = {
    DP: {
        abi: DPAbi,
        address: DPAddress,
        bytecode: DPCode
    },
    HD: {
        abi: HDAbi,
        address: HDAddress,
        bytecode: HDCode
    }
};