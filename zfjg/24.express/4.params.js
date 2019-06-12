const express = require('express');

const app = express();

// : 意味着这个部分是一个占位符，用来匹配一个任意字符串
// /user/Michale/18
// restful api      GET /user/1 获取ID为1的用户详情
// vue react

app.get('/user', function (req, res) {
    console.log(req.params);
    console.log('ok');
});

app.listen(5000)