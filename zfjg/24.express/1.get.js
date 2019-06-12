const express = require('./express');

const app = express();

// 最重要是路由功能  根据不同的方法和不同的路径 返回不同的内容
// 定义路由规则
//
app.get('/hello', function (req, res) {
    res.end('hello')
});

app.post('/world', function (req, res) {
    res.end('world');
});

/*app.all('/hello', function (req, res) {
    res.end('hello')
})*/

// 任何路径
app.all('*',function (req, res) {
    res.end('hello')
})

// 启动服务器
app.listen(8082, function () {
    console.log('server started at 8082');
});