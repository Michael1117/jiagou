/*
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
*/
import {createElement, render, renderDom} from './element';

let virtualDom1 = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item'}, ['a']),
    createElement('li', {class: 'item'}, ['b']),
    createElement('li', {class: 'item'}, ['c'])
]);


let virtualDom2 = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item'}, ['a']),
    createElement('li', {class: 'item'}, ['b']),
    createElement('li', {class: 'item'}, ['c'])
]);

// 将虚拟dom成真实dom渲染到页面上
let el = render(virtualDom1);

renderDom(el, window.root)
console.log(el);
console.log(virtualDom1);

// DOM Diff比较两个虚拟DOM区别 比较两个对象的区别

// dom diff 作用 根据两个虚拟对象创建出补丁，描述改变的内容，将这个补丁用来更新dom