#! /usr/bin/env node

//console.log('hello world')

// 这个文件就要描述如何打包
let entry = './src/index.js';   // 入口文件
let output = './dist/main.js';   // 出口文件
let fs = require('fs');
let ejs = require('ejs');
let script = fs.readFileSync(entry, 'utf8');

let template = `(function (modules) { 
    function require(moduleId) {    
        var module = {
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports,require);
        return module.exports;
    }
    return require("<%-entry%>");
})

({
    "<%-entry%>":
        (function (module, exports) {
            eval(\`<%-script%>\`);
        })
});`


let result = ejs.render(template, {
    entry,
    script
});

// result 为替换后的结果，最后要写到output中
fs.writeFileSync(output, result);
console.log("编译成功");
