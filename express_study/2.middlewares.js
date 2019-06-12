// 中间件 use
// 中间件 在执行路由之前 要跟一些处理工作 就可以采用中间件
// 中间件 可以扩展一些方法

//let express = require('express');
let express = require('./express');
let app = express();

app.use('/name', function (req, res, next) {
    console.log('middlewares1');
    next()
});

// 默认是 '/' ，不写就是全匹配
app.use( function (req, res, next) {
    console.log('middlewares2');
    //next('名字不合法');  // 中间件传参数，最后面会接收到
    next();
});
/*app.get('/name/n', (req, res) => {
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.end('我是Michael')
})*/

app.get('/age', (req, res) => {
    console.log(req.path);
    console.log(req.hostname);
    console.log(req.query);
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.end('今年18岁')
})

// 错误中间件(4个参数)  放到路由的下面
/*
app.use(function (err, req, res, next) {
    console.log(err);
    next();
})

app.use(function (err, req, res, next) {
    console.log(err);
})
*/

app.listen(8080, () => {
    console.log(`server start 8080`);
})

// http://localhost:8080/age?a=1