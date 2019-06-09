let express = require('express');
let app = express();
let whiteList = ['http://localhost:3001'];  // 白名单
app.use(function (req, res, next) {
    let origin = req.headers.origin;
    if (whiteList.includes(origin)) { // 可以访问
        res.setHeader('Access-Control-Allow-Origin', '*');   // 允许哪个源能访问我
        res.setHeader('Access-Control-Allow-Headers', 'name');  // 允许哪个头能访问我
        res.setHeader('Access-Control-Allow-Methods', 'PUT');   // 允许哪个方法能访问我
        res.setHeader('Access-Control-Allow-Credentials', true);    // cookie 凭证
        res.setHeader('Access-Control-Max-Age', 3);  // 预检存活时间 3秒内刷新浏览器只发一次请求，过了3秒发送两次请求
        res.setHeader('Access-Control-Expose-Headers', 'name'); // 允许前端获取哪个头
        if (req.method === "OPTIONS") {
            res.end();  // OPTIONS 请求不做处理
        }
    }
    next();
})

app.put('/getData', (req, res) => {
    console.log(req.headers);
    res.setHeader('name', 'hee');
    res.end("我不爱你");
})
app.get('/getData', (req, res) => {
    console.log(req.headers);
    res.end("我不爱你");
})
app.use(express.static(__dirname));
app.listen(4000);