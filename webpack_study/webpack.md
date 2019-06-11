## 1.模块化

模块化是指把一个复杂的系统分解到多个模块以方便编码



### 1.1 命名空间

开发网页要通过命名空间的方式来组织代码

- 命名空间冲突，两个库可能会使用同一个名称

- 无法合理地管理项目的依赖和版本

- 无法方便地控制依赖的加载顺序


### 1.2 CommonJS

CommonJS是一种使用广泛的`JavaScript`模块化规范，核心思想是通过`require`方法来同步加载依赖的其他模块，通过 module.exports 导出需要暴露的接口

### 1.2.1 用法

采用 CommonJS导入及导出时的代码如下：
```javascript
// 导入
const moduleA = require('./moduleA');

// 导出
module.exports = moduleA.someFunc;
```

a.js
```javascript
module.exports = "欢迎来到webpack";
```
b.js
```javascript

let str = require('./a');   // require方法在node中是同步的

console.log(str);
```

### 1.2.2 原理

a.js

```javascript
let fs = require('fs');
let path = require('path');
let b = req('./b.js');

function req(mod) {
    let filename = path.join(__dirname, mod);
    let content = fs.readFileSync(filename, 'utf8');
    let fn = new Function('exports', 'require', 'module','__filename','__dirname', content+'\n return module.exports')

    let module = {
        exports : {

        }
    }
    return fn(module.exports, req, module, __filename, __dirname)
}
```

b.js
```javascript
    console.log('bbb');
    exports.name='zfpx'

```

### 1.3 AMD

AMD也是一种JavaScript模块化规范，与CommonJS最大的不同在于它采用异步的方式去加载依赖的模块。AMD规范主要是为了解决针对浏览器环境的模块化问题，最具代表性的实现是requirejs.

AMD 的优点
- 可在不转化代码的情况下直接运行在浏览器中
- 可加载多个依赖
- 代码可运行在浏览器环境和Node.js环境下
  

AMD 的缺点
- JavaScript 运行环境没有原生支持AMD,需要先导入实现了AMD的库后才能正常使用

. require.js

```javascript
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


```

### 1.4 ES6 模块化
ES6 模块化是 `ECMA`提出的`JavaScript`模块化规范，它在语言的层面实现了模块化。浏览器厂商和`Node.js`都宣布要原生支持该规范。它将逐渐取代`CommonJS`和`AMD`规范，成为浏览器和服务器通用的模块解决方案。
采用ES6模块化导入及导出时的代码如下

```javascript
// 导入
import { name } from './person.js';

// 导出
export const name = 'zfpx';
```

ES6模块虽然是终极模块化方案，但是目前大部分浏览器并不支持。

## 2. 自动化构建

构建就是把源代码转换成发布到线上的可执行JavaScript、CSS、HTML代码，包括如下内容。

- 代码转换： ECMASCRIPT6 编译成 ECMASCRIPT5、LESS编译成CSS等。
- 文件优化： 压缩JavaScript、CSS、HTML代码，压缩合并图片等。
- 代码分割： 提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
- 模块合并： 在采用模块化的项目里会有很多模块和文件，需要构建功能把模块分类合并成一个文件。
- 自动刷新： 监听本地源代码的变化，自动重新构建、刷新浏览器。
- 代码校验： 在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
- 自动发布： 更新完代码后，自动构建出线上发布代码并传输给发布系统。






// 全局安装 npm install webpack -g

// 本地安装 推荐

```
npm init -y
npm install webpack webpack-cli -D (开发依赖)

rm -rf node_modules 删除node_modules

npx webpack
```

node_modules下的.bin下有webpack和webpack-cli
![1560218899345](C:\Users\michaelhee\AppData\Roaming\Typora\typora-user-images\1560218899345.png)

运行npx webpack，打包src下的文件，生成dist

![1560219078492](C:\Users\michaelhee\AppData\Roaming\Typora\typora-user-images\1560219078492.png)

```
npx webpack --mode development 开发模式运行
```

main.js初始代码

```javascript
 (function(modules) { // webpackBootstrap
 	// The module cache
 	var installedModules = {};

 	// The require function
 	function __webpack_require__(moduleId) {

 		// Check if module is in cache
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		// Create a new module (and put it into the cache)
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};

 		// Execute the module function
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

 		// Flag the module as loaded
 		module.l = true;

 		// Return the exports of the module
 		return module.exports;
 	}


 	// expose the modules object (__webpack_modules__)
 	__webpack_require__.m = modules;

 	// expose the module cache
 	__webpack_require__.c = installedModules;

 	// define getter function for harmony exports
 	__webpack_require__.d = function(exports, name, getter) {
 		if(!__webpack_require__.o(exports, name)) {
 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
 		}
 	};

 	// define __esModule on exports
 	__webpack_require__.r = function(exports) {
 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
 		}
 		Object.defineProperty(exports, '__esModule', { value: true });
 	};

 	// create a fake namespace object
 	// mode & 1: value is a module id, require it
 	// mode & 2: merge all properties of value into the ns
 	// mode & 4: return value when already ns object
 	// mode & 8|1: behave like require
 	__webpack_require__.t = function(value, mode) {
 		if(mode & 1) value = __webpack_require__(value);
 		if(mode & 8) return value;
 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
 		var ns = Object.create(null);
 		__webpack_require__.r(ns);
 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
 		return ns;
 	};

 	// getDefaultExport function for compatibility with non-harmony modules
 	__webpack_require__.n = function(module) {
 		var getter = module && module.__esModule ?
 			function getDefault() { return module['default']; } :
 			function getModuleExports() { return module; };
 		__webpack_require__.d(getter, 'a', getter);
 		return getter;
 	};

 	// Object.prototype.hasOwnProperty.call
 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

 	// __webpack_public_path__
 	__webpack_require__.p = "";


 	// Load entry module and return exports
 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
 })
/************************************************************************/
 ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("console.log(\"欢迎来到webpack4\");\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

 });
```

精简后的main.js

```javascript
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
```

![1560220263129](C:\Users\michaelhee\AppData\Roaming\Typora\typora-user-images\1560220263129.png)



![1560220282011](C:\Users\michaelhee\AppData\Roaming\Typora\typora-user-images\1560220282011.png)

> npm link

![1560220583411](C:\Users\michaelhee\AppData\Roaming\Typora\typora-user-images\1560220583411.png)

![1560220624159](C:\Users\michaelhee\AppData\Roaming\Typora\typora-user-images\1560220624159.png)

> 运行zfpk

![1560220655797](C:\Users\michaelhee\AppData\Roaming\Typora\typora-user-images\1560220655797.png)