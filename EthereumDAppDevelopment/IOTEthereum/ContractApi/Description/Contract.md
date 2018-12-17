## contract DeviceProvider

- property

```js
deviceProviderAddress => 有些 function 必須為設備提供商才能使用
(mapping)deviceIDAddress => key =設備id，value=創建設備合約位址
deviceIDs => 記錄所有設備ID，知道有哪些id被使用及數量
```

- event

```js
deviceCreated(uint64 _deviceID,address indexed _address)=>創建設備合約，紀錄deviceID和設備合約位址
```

- Function

createContainer

```js
輸入參數：deviceID
檢測：(1)是否為設備提供商(2)該deviceID是否被使用過
回傳：設備合約address
```

getDeviceIDs

```js
檢測：是否為設備提供商
回傳：所有設備ID
```

countDeviceIDs

```js
檢測：是否為設備提供商
回傳：設備ID總數量
```

getAddress

```js
檢測：是否為設備提供商
回傳：某一台設備的合約address
```

## contract HealthDevice

- 資料結構

```js
struct HealthData {
        uint Heartbeat; => 心跳
        uint SpO2; => 血氧濃度
    }
```

- property

```js
deviceID => healthDatas 的 key
deviceProviderAddress => 有些 function 必須為設備提供商才能使用（ex:更新使用者）
userAddress => 有些 function 必須為 user 才能使用(ex:上傳資料)
(mapping)healthDatas => key=設備 ID,value=心跳、血氧濃度
```

- event

更新使用者

```js
addOrUpdateUser(address _useraddress) => 更新使用者;
```

上傳資料

```js
event dataUploadEvent(address indexed _address ,uint _heartbeat ,uint _spO2);

address => user address
_heartbeat => 心跳
_spO2 => 血氧濃度
```

- Function

addOrUpdateUser（設定使用者）

```js
輸入參數：useraddress
檢測：呼叫此function的address是否為設備提供商
```

updateHealthData（使用者將自己健康資料上傳）

```js
輸入參數：deviceID、心跳、血氧濃度(ex:"heartbeat,spo2")
檢測：呼叫此function的address是否為user
```

getHealthData

```js
回傳：最新一筆心跳、血氧濃度資料
```

getDeviceProviderAddress

```js
回傳：設備提供商address
```

getUserAddress

```js
回傳：useraddress
```
