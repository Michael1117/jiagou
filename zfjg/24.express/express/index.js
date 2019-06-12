const http = require('http');
const url = require('url');

function createApplication() {
    // app 其实就是真正的请求监听函数
    let app = function (req, res) {
        const {pathname} = url.parse(req.url, true);

        let index = 0;

        function next(err) {
            if (index >= app.routes.length) {
                return res.end('Cannot ${req.method} ${pathname}');
            }
            let route = app.routes[index++];
            if (err) {
                if (route.method === 'middle') {
                    // 判断路径是否匹配
                    if ((route.path === '/' || pathname.startsWith(route.path + '/') || pathname === route.path)) {
                        // 判断是不是错误处理中间件
                        if (route.handler.length === 4) {
                            route.handler(err, req, res, next)
                        } else {
                            next(err)
                        }
                    }
                } else {
                    next(err)
                }
            } else {
                if (route.method === 'middle') {
                    // 只要请求路径是以此中间件的路径开头就可以
                    if ((route.path === '/' || pathname.startsWith(route.path + '/') || pathname === route.path)) {
                        route.handler(req, res, next);
                    } else {
                        next()
                    }
                } else {    // 路由
                    if (route.paramsNames) {    // 意味着有路径参数
                        let matches = pathname.match(route.path);
                        // matches = [匹配结果， 分组]
                        if (matches) {
                            let params = {};
                            for (let i = 0; i < route.paramsNames.length; i++) {
                                params[route.paramsNames[i]] = matches[i + 1]
                            }
                            req.params = params;
                            route.handler(req, res);
                        } else {
                            next()
                        }
                    } else {
                        if ((route.method === req.method.toLowerCase() || route.method === 'all') && (route.path === pathname || route.path === '*')) {
                            //console.log(req,res);
                            return route.handler(req, res);
                        } else {
                            next();
                        }
                    }

                }
            }

        }

        next();
    }

    app.listen = function () {
        let server = http.createServer(app);
        server.listen.apply(server, arguments)
    }
    // 此数组用来保存路由规则
    app.routes = [];
    //console.log(http.METHODS);
    http.METHODS.forEach(function (method) {
        method = method.toLowerCase();

        // get就代表HTTP的GET请求
        app[method] = function (path, handler) {
            const layer = {method, path, handler};
            // 向数组里放置路由对象
            if (path.includes(":")) {
                let paramsNames = [];
                // 1.把原理的路径转成正则表达式
                // 2.提取出变量名
                // 3.
                path = path.replace(/:([^\/]+)/g, function () {
                    paramsNames.push(arguments[1]);
                    return '([^\/]+)';
                });

                layer.path = new RegExp(path);  // 路径 变成了正则表达式
                layer.paramsNames = paramsNames;    // 变量名数组
                // /user/([^\/]+?)/([^\/]+?)
            }

            app.routes.push()
            /*app.routes.push({
                method,
                path,       // 匹配路径
                handler     // 处理函数
            })*/
        }
    })
    // all 方法可以匹配所有的HTTP请求方法
    app.all = function (path, handler) {
        // 向数组放置路由对象
        app.routes.push({
            method: 'all',
            path,
            handler
        })
    }

    // 添加一个中间件
    app.use = function (path, handler) {
        if (typeof handler !== 'function') {
            handler = path;
            path = '/';
        }

        app.routes.push({
            method: 'middle',
            path,
            handler
        })
    };

    // 系统内置中间件， 用来为请求和响应对象添加一些方法和属性
    app.use(function (req, res, next) {
        const urlObj = url.parse(req.url, true);
        req.query = urlObj.query;
        req.path = urlObj.pathname;
        req.hostname = req.headers['host'].split(':')[0];
        next();
    });
    return app;
}

module.exports = createApplication;