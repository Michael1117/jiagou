const express = require('express');

const app = express();
// 使用use一个中间件 next也是一个函数，调用它则意味着当前的中间件执行完毕，可以继续向下执行别的中间件
app.use(function (req, res, next) {
    console.log("没有路径的中间件");
    // 调用next的时候如果传入一个任意参数就表示此函数发生了错误，然后express就跳过后面所有的中间件和路由交给错误处理中间件处理
    next('出错了');
});


app.use('/water', function (req, res, next) {
    console.log("过滤杂质");
   // res.end('ok')
    next();
});

app.get('/water', function (req, res) {
    res.end('water')
});

app.use('/hello', function (err, req, res, next) {
    res.end('hello ' + err);
    next(err);
})

app.use('/water', function (err, req, res, next) {
    //res.end('water ' + err);
    next(err);
})

app.use('/water', function (err, req, res, next) {
    res.end('water2 ' + err);
})
// 启动服务器
app.listen(8083, function () {
    console.log('server started at 8083');
});