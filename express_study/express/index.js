let http = require('http');
let url = require('url');

function createApplication() {
    // app是一个监听函数
    let app = (req, res) => {
        // 取出每一个layer
        // 1. 获取请求的方法
        let m = req.method.toLowerCase();   // 请求方法转小写
        let {pathname} = url.parse(req.url, true);  // 查询字符串变为对象
        // 通过next方法进行迭代
        let index = 0;

        function next(err) {
            // 如果数组全部迭代完成还没有找到  说明路径不存在
            if (index === app.routes.length) return res.end(`Cannot ${m} ${pathname}`);
            let {method, path, handler} = app.routes[index++];    // 每次调用next就应该取下一个layer
            if (err) {
                // 如果有错误  应该去找错误中间件 ，错误中间件回调函数(handler)有4个参数
                if (handler.length === 4) {
                    handler(err, req, res, next)
                } else {
                    // 如果没有匹配到  要将err继续传递下去
                    next(err)   // 继续走下一个layer继续判断
                }
            } else {

                if (method === 'middle') {  // 处理中间件
                    if (path === '/' || path === pathname || pathname.startsWith(path + '/')) {
                        handler(req, res, next)
                    } else {
                        next();     // 如果这个中间件没有匹配到 那么继续走下一个层匹配
                    }
                } else {   // 处理路由
                    if ((method === m || method === 'all') && (path === pathname || path === '*')) {
                        handler(req, res);  // 匹配成功后执行对应的callback
                    } else {
                        next();
                    }
                }
            }

        }

        next();         // 中间件中的next方法


        /*for (let i = 0; i < app.routes.length; i++) {
            let {method, path, handler} = app.routes[i];
            if ((method === m || method === 'all') && (path === pathname || path === '*')) {
                handler(req, res);  // 匹配成功后执行对应的callback
            }
        }*/
        //res.end(`Cannot ${m} ${pathname} `)
    }

    app.routes = [];
    app.use = function (path, handler) {
        if (typeof handler !== 'function') {    // 如果只传递了一个参数
            handler = path;
            path = '/';
        }

        let layer = {
            method: 'middle',   // method是middle表示就是一个中间件
            path,
            handler
        }

        app.routes.push(layer)      // 将中间件放入容器中
    }
    app.use(function (req, res, next) {
        let {pathname, query} = url.parse(req.url, true);
        let hostname = req.headers['host'].split(':')[0];
        req.path = pathname;
        req.query = query;
        req.hostname = hostname;
        next()
    })
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

// 路径参数 /article/:id/:name

// express  子路由
// res封装

// 模板渲染