/*
let path = require('path')

console.log(__dirname);*/

let ejs = require('ejs');
let name = 100;

console.log(ejs.render('<a><%=name%></a>', {name}));    // 转义  <a>100</a>

console.log(ejs.render('<a><%-name%></a>', {name}));    // 不转义 <a>100</a>