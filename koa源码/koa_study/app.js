/*
const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world')
}).listen(3000)*/

/*
const Koa = require('koa');

const app = new Koa();
const {createReadStream} = require('fs');

// 模块化/简单，清晰

app.use(async (ctx, next)=> {
    if (ctx.path === '/favicon.ico') {
        ctx.body = createReadStream('./favicon.ico');
    } else {
       await next();
    }
})

app.use(ctx => {
    ctx.body = 'hi hello world';
})
app.listen(3001)*/


// 使用自己的kkb

const KKb = require("./kkb")
const app = new KKb();

/*app.use((req, res) => {
    res.writeHead(200);
    res.end('hi')
});*/


function delay() {
    return new Promise(((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000)
    }))
}

app.use(async (ctx, next) => {
    ctx.body = "1";
    setTimeout(() => {
        ctx.body += "2";
    }, 2000)
    await next();
    ctx.body += "3";
})


app.use(async (ctx, next) => {
    ctx.body += "4";
    await delay();
    await next();
    ctx.body += 5;
})

app.use(async (ctx, next) => {
    ctx.body += "6";
})


app.listen(3003)