// express 是一个函数

//let express = require('express');

let express = require('./express'); // 引入自己的express
// app 监听函数
let app = express();
// RESTFul API 根据方法名的不同 做对应的处理
app.get('/name', function (req, res) {
    res.end('Hello World')
});
app.get('/age', function (req, res) {
    res.end('9')
})


app.post('/name', function (req, res) {
    res.end('Michael')
})

// all表示匹配所有的方法  * 表示匹配所有的路径

app.all('*', function (req, res) {
    res.end(req.method + 'user');
})
/*app.all('/user', function (req, res) {
    res.end(req.method + 'user');
})*/
app.listen(3000, function () {
    console.log(`server start 3000`);
});