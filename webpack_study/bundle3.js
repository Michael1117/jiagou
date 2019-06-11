(function (modules) {   // 带注释的
    function require(moduleId) {
        var module = {
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, require);
        return module.exports;
    }
    return require("./src/index.js");
})
({

    "./src/a.js":
        (function (module, exports) {
            eval("module.exports = '欢迎来到webpack4';\n\n//# sourceURL=webpack:///./src/a.js?");
        }),
    "./src/index.js":
        (function (module, exports, require) {
            eval("let result = require(/*! ./a.js */ \"./src/a.js\");\r\nconsole.log(result);\r\n//console.log(\"欢迎来到webpack4~~~~\");\n\n//# sourceURL=webpack:///./src/index.js?");
        })
});