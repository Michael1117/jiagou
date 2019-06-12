let http = require('http');
let url = require('url');

function createApplication() {
    // app是一个监听函数
    let app = (req, res) => {
        // 取出每一个layer
        // 1. 获取请求的方法
        let m = req.method.toLowerCase();   // 请求方法转小写
        let {pathname} = url.parse(req.url, true);  // 查询字符串变为对象
        for (let i = 0; i < app.routes.length; i++) {
            let {method, path, handler} = app.routes[i];
            if ((method === m || method === 'all') && (path === pathname || path === '*')) {
                handler(req, res);  // 匹配成功后执行对应的callback
            }
        }
        res.end(`Cannot ${m} ${pathname} `)
    }

    app.routes = [];
    app.all = function (path, handler) {
        let layer = {
            method: 'all', // 如果method是all 表示全部匹配
            path,
            handler
        }

        app.routes.push(layer);
    }
    http.METHODS.forEach(method => {
        method = method.toLowerCase();  // 转小写
        app[method] = function (path, handler) {
            let layer = {
                method,
                path,
                handler
            }
            app.routes.push(layer);
        }
    })
    //console.log(http.METHODS);
    app.listen = function () {
        let server = http.createServer(app);
        server.listen(...arguments);
    }
    return app;
}

module.exports = createApplication;