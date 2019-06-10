## 生成项目

```
npm install -g create-react-app
create-react-app dom-diff
```

## 虚拟dom 

createElement => {type,props,children}

### DOM diff(34:30)

dom diff是通过JS层面的计算，返回一个patch对象，即补丁对象

在通过特定的操作解析patch对象，完成页面的渲染。





### DOM diff三种优化策略(35:53)

更新的时候只比较平级(一层层比较)，并不会跨级比较

同级能够实现换位置。





### 差异计算(38:20)

先序深度优先遍历

1.用JavaScript对象模拟DOM

2.把此虚拟DOM转成真实DOM,并插入页面中。

3.如果有事件发生修改了虚拟DOM，则比较两颗虚拟DOM树的差异，得到差异对象

4.把差异对象应用到真正的DOM树上