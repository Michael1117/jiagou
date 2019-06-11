let fs = require('fs');

function req(moduleName) {
    // content代表文件内容
    let content = fs.readFileSync(moduleName, 'utf8');
    // 最后一个参数是函数的内容体
    /**
     * exports
     * module
     * require
     * __dirname    文件夹路径
     * __filename   文件路径
     * @type {Function}
     */
    let fn = new Function('exports', 'module', 'require', '__dirname', '__filename', content + '\n return module.exports');
    let module = {
        exports: {}
    }

    return fn(module.exports, module, req, __dirname, __filename)
}

let str = req('./a.js');

console.log(str);

/*
let str = require('./a');   // require方法在node中是同步的

console.log(str);*/

/*
*   function(exports, module, require, __dirname, __filename) {
*       module.exports = "欢迎来到webpack";
*       return module.exports;
*   }
*
*
*
* */