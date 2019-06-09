let express = require('express');
let app = express();
let WebSocket = require('ws');
let wss = new WebSocket.Server({port:3006})

wss.on('connection', function (ws) {
    ws.on('message', function (data) {
        console.log(data);
        ws.send('我不爱你');    // 服务器发送消息
    });
})
