## 會更改狀態的Function

| send/call | on/then | return?  |
| --------- | ------- | -------- |
| send      | on      | 事件訊息 |
| send      | then    | 事件訊息 |
| call      | on      | 失敗     |
| call      | then    | value    |

## 不會更改狀態的Function

| send/call | on/then | return?  |
| --------- | ------- | -------- |
| send      | on      | 事件訊息 |
| send      | then    | 事件訊息 |
| call      | on      | 失敗     |
| call      | then    | value    |