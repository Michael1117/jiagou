(function (modules) { // webpackBootstrap
    function require(moduleId) {    // moduleId代表文件名
        var module = {
            exports: {}
        };
        // 执行module函数
        modules[moduleId].call(module.exports, module, module.exports,require);
        return module.exports;
    }
    return require( "./src/index.js");
})

({
    "./src/index.js":
        (function (module, exports) {
            eval("console.log(\"欢迎来到webpack4\");\n\n//# sourceURL=webpack:///./src/index.js?");
        })
}); // 参数是对象 {key: value}