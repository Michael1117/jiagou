// define 声明模块 通过require使用一个模块  AMD
let factories = {};

/**
 *
 * @param moduleName  模块名字
 * @param dependencies  依赖
 * @param factory 工厂函数
 */
function define(moduleName, dependencies, factory) {
    factories[moduleName] = factory;
}


function require(mods, callback) {
    let result = mods.map(function (mod) {   // name,age
        let factory = factories[mod];
        let exports ;
        exports = factory();
        return exports;
    })
    console.log(result);
    callback.apply(null, result)
}

define('name', [], function () {
    return "Hello World";
});

define('age', [], function () {
    return 9;
});

require(['name', 'age'], function (name, age) {
    console.log(name, age);
});

