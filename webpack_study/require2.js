// define 声明模块 通过require使用一个模块  AMD
let factories = {};

/**
 *
 * @param moduleName  模块名字
 * @param dependencies  依赖
 * @param factory 工厂函数
 */
function define(moduleName, dependencies, factory) {
    factory.dependencies = dependencies;    // 将依赖记到factory上
    factories[moduleName] = factory;
}

function require(mods, callback) {
    let result = mods.map(function (mod) {   // name,age
        let factory = factories[mod];
        let exports;
        let dependencies = factory.dependencies;   // ['name']
        // require(['name'], function(){})
        require(dependencies, function (...args) {
            //console.log(...args);
            exports = factory.apply(null, arguments);
        });
        return exports;
    })
    //console.log(result);
    callback.apply(null, result)
}

define('name', [], function () {
    return "Hello World--";
});

define('age', ['name'], function (name) {
    return name + 9;
});

require(['age'], function (age) {
    console.log(age);
});

