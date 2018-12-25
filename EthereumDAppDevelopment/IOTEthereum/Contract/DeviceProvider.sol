pragma solidity ^0.5.0;

contract DeviceProvider{
    HealthDevice subdevice;
    address private deviceProviderAddress;
    
    mapping(uint64 => address) deviceIDAddress;
    uint64[] private deviceIDs;
    
    event deviceCreated(uint64 _deviceid,address indexed _devicecontractaddress,address indexed _providercontractaddress,address indexed _hospitaladdress,uint _time);

    constructor () public {   
        deviceProviderAddress = msg.sender;
    }
    
    //creat a new contract of device
    function createContainer(uint64 _deviceID,address _hospitalAddress) public returns(address _deviceIDAddress){
        require(deviceProviderAddress == msg.sender,"you are not deviceProvider!");    
        require(deviceIDAddress[_deviceID] == address(0),"this deviceID has been used!");
        
        subdevice = new HealthDevice(_deviceID,_hospitalAddress);
        deviceIDAddress[_deviceID] = address(subdevice);
        
        deviceIDs.push(_deviceID);
        
        emit deviceCreated(_deviceID, address(subdevice),msg.sender,_hospitalAddress,block.timestamp);
        return address(subdevice);
    }
    
    function getDeviceIDs() public view returns(uint64[] memory) {
        require(deviceProviderAddress == msg.sender,"you are not deviceProvider!"); 
        return deviceIDs;
    }
    
    function countDeviceIDs() public view returns (uint) {
        require(deviceProviderAddress == msg.sender,"you are not deviceProvider!"); 
        return deviceIDs.length;
    }
    
    function getAddress(uint64 _deviceID) public view returns (address){
        require(deviceProviderAddress == msg.sender,"you are not deviceProvider!"); 
        return deviceIDAddress[_deviceID];
    }
} 

contract HealthDevice{
    struct HealthData {
        uint Heartbeat;
        uint SpO2;
    }
    uint64  private deviceID;
    address private hospitalAddress;
    address private userAddress;
    
    mapping(uint64 => HealthData) healthDatas;
    //mapping(uint64 => uint64) healthDatas;
    
    event addOrUpdateUserEvent(address indexed _hospitaladdress,address indexed _useraddress,uint _time);
    event dataUploadEvent(address indexed _useraddress ,uint _heartbeat ,uint _spO2,uint _time);
    //event dataUploadEvent2(address indexed _address ,string _data);
    
    constructor(uint64 _deviceID,address _address) public {
        deviceID = _deviceID;
        hospitalAddress = _address;   
    }
    
    function addOrUpdateUser(address _useraddress) public {
        //只有醫療機構才能設定使用者
        require(hospitalAddress == msg.sender,"you are not hospital!"); 
        userAddress = _useraddress;
        emit addOrUpdateUserEvent(msg.sender,_useraddress,block.timestamp);
    }

    function updateHealthData(uint _heartBeat,uint _spO2) public {
        //只有使用者才能將資料上傳
        require(_heartBeat >= 0,"input error!");
        require(_spO2 >= 0,"input error!");
        require(userAddress == msg.sender,"you are not user!");
        healthDatas[deviceID].Heartbeat = _heartBeat;
        healthDatas[deviceID].SpO2 = _spO2;
        emit dataUploadEvent(msg.sender,_heartBeat,_spO2,block.timestamp);
    }

    // function updateHealthData2(string memory _data) public {
    //     //只有使用者才能將資料上傳
    //     //require(userAddress == msg.sender,"you are not user!");
    //     //healthDatas[deviceID] = _data;
    //     emit dataUploadEvent2(msg.sender, _data);
    // }
    
    function getHealthData() public view returns (uint _heartBeat,uint _spO2) {
        _heartBeat = healthDatas[deviceID].Heartbeat;
        _spO2 = healthDatas[deviceID].SpO2;
        //return (healthDatas[deviceID].Heartbeat, healthDatas[deviceID].SpO2);
    }

    function getHospitalAddress() public view returns (address){
        return hospitalAddress;
    }

    function getUserAddress() public view returns (address){
        return userAddress;
    }
}