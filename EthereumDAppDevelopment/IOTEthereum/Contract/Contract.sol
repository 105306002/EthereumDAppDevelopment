pragma solidity ^0.5.0;


//以下爲工廠模式合約範例
contract ServiceProvider {
    struct ContractData {
        address HospitalAddress;
        address ContractAddress;
    }
    HealthRecord healthRecord;
    address public creatorAddress;
    //增加醫療機構參與者
    mapping(address => bool) participants;
    mapping(string => ContractData) contractDatas;

    event participantAdded(address indexed newParticipant);
    event contractCreated(string userId,string deviceId,address indexed contractAddress);
    //以modifier檢查
    modifier isParticipant() {
        require(participants[msg.sender] == true, "Account Forbidden");
        _;
    }
    //initialize
    constructor () public {
        creatorAddress = msg.sender;
        participants[msg.sender] = true;
    }
    
    function createContract(string memory _userId,string memory _deviceID) public isParticipant()
    {
        healthRecord = new HealthRecord(_userId);
        contractDatas[_deviceID].HospitalAddress = msg.sender;
        contractDatas[_deviceID].ContractAddress = address(healthRecord);

        emit contractCreated(_userId,_deviceID, address(healthRecord));
    }
    
    //新增合約參與者 只有區塊鏈服務提供者才能新增
    function addParticipant(address _newParticipant) public returns (bool){
        require(msg.sender == creatorAddress, "Access Deny!");
        //only creator can access
        require(_newParticipant != address(0),"Address Empty!");
        participants[_newParticipant] = true;
        emit participantAdded(_newParticipant);
        return true;
    }
    
    //確認EOA地址是否為合約參與者
    function checkParticipant(address _address) public view returns (bool){
        return participants[_address];
    }
    function getContractDataByDeviceId(string memory _deviceID) public view returns (address hospitalAddress,address contractAddress){
        hospitalAddress = contractDatas[_deviceID].HospitalAddress;
        contractAddress = contractDatas[_deviceID].ContractAddress;
    }
}

contract HealthRecord{

    struct HealthData {
        uint Heartbeat;
        uint SpO2;
    }

    string userId;
    
    mapping(uint64 => HealthData) healthDatas;

    event dataUploadEvent(string userId ,uint heartBeat ,uint spO2);

    constructor(string memory _userId) public {
        userId = _userId;  
    }
    
    function updateHealthData(uint _heartBeat,uint _spO2) public {
        //只有使用者才能將資料上傳
        require(_heartBeat >= 0,"input error!");
        require(_spO2 >= 0,"input error!");
    
        emit dataUploadEvent(userId,_heartBeat,_spO2);
    }  
}