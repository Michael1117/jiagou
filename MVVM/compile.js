class Compile { // 编译
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);   //判断是否为元素节点，不是就创建 #app document.querySelector
        this.vm = vm;
        if (this.el) {
            // 如果这个元素能获取到 才开始编译
            // 1. 先把真实的DOM移入内存中  fragment (文档碎片)
            let fragment = this.node2fragment(this.el);   // #app包含的所有内容 node节点放入fragment中
            // 2. 编译 => 提取想要的元素节点 v-model 和文本节点 {{}}
            this.compile(fragment);
            // 3. 把编译好的fragment塞回页面
            this.el.appendChild(fragment);
        }
    }
    // 辅助方法
    isElementNode(node) {
        return node.nodeType === 1; // 元素节点
    }
    // 是不是指令
    isDirective(name) {
        return name.includes('v-')
    }
    // 核心方法
    compileElement(node) {
        // 带 v-model  v-text  DOM元素节点不能正则匹配
        let attrs = node.attributes;    // 取出当前节点的属性
        //console.log(attrs);
        Array.from(attrs).forEach(attr => {
            //console.log(attr);
            //console.log(attr.name, attr.value);
            // 判断属性名字是不是包含v-
            let attrName = attr.name;
            if (this.isDirective(attrName)) {
                // 取到对应的值放到节点中
                let expr = attr.value;
                //let type = attrName.slice(2);
                let [, type] = attrName.split('-')
                console.log(type);
                // node vm.$data expr  // v-model  v-text  v-html
                CompileUtil[type](node, this.vm, expr)
            }
        })
    }
    compileText(node) {
        // 带 {{}}
        let expr = node.textContent;    // 取文本中的内容
        let reg = /\{\{([^}]+)\}\}/g;   // {{a}} {{b}}  {{c}}
        //console.log(expr);
        if (reg.test(expr)) {
            // node this.vm.$data text
            CompileUtil['text'](node, this.vm, expr)

        }
    }
    compile(fragment) {
        // 只能到第一层 需要递归
        let childNodes = fragment.childNodes;  // childNodes是类数组，需要转成数组Array.from
        //console.log(childNodes);
        Array.from(childNodes).forEach(node => {
            if (this.isElementNode(node)) {
                // 是元素节点，还需要继续深入的检测
                //console.log('elements', node);
                // 编译元素
                this.compileElement(node);
                this.compile(node);
            } else {
                // 文本节点
                //console.log('text', node);
                // 编译文本
                this.compileText(node);
            }
        })
    }
    node2fragment(el) {  // 需要将el中的内容全部放入到内存中25:48
        // 文档碎片
        let fragment = document.createDocumentFragment();
        let firstChild;
        while (firstChild = el.firstChild) {
            fragment.appendChild(firstChild)
        }
        return fragment;    // 内存中的节点
    }
}
// 编译工具方法
CompileUtil = {
    getVal(vm, expr) {  // 获取实例上对应的数据
        expr = expr.split('.');     // [a,v,c,s,a,w,r]
        return expr.reduce((prev, next) => {  // vm.$data.a
            return prev[next];
        }, vm.$data)
    },
    getTextVal(vm, expr) {  // 获取编译文本后的结果
        return expr.replace(/\{\{([^}]+)\}\}/g, (...args) => {
            return this.getVal(vm, args[1])
        });
    },
    text(node, vm, expr) {    // 文本处理
        let updateFn = this.updater['textUpdater'];
        //vm.$data[expr];  => [message,a]  vm.$data.message.a
        //updateFn && updateFn(node);

        let value = this.getTextVal(vm, expr);
        expr.replace(/\{\{([^}]+)\}\}/g, (...args) => {
            new Watcher(vm, args[1], () => {
                // 如果数据变化了，文本节点需要重新获取依赖的属性更新文本中的内容
                updateFn && updateFn(node, this.getTextVal(vm, expr))
            });
        });

        updateFn && updateFn(node, value)
    },
    setVal(vm, expr, value) {
        expr = expr.split('.');
        return expr.reduce((prev, next, currentIndex) => {
            // 收敛
            if (currentIndex === expr.length - 1) {
                return prev[next] = value;
            }
            return prev[next];
        }, vm.$data)
    },
    model(node, vm, expr) {   // 输入框处理
        let updateFn = this.updater['modelUpdater'];
        //vm.$data[expr];  => [message,a]  vm.$data.message.a

        // 加一个监控  数据变化了  应该调用watch的callback
        new Watcher(vm, expr, (newValue) => {
            // 当值变化后会调用cb 将新的值传递过来  ()
            updateFn && updateFn(node, this.getVal(vm, expr));
        });
        node.addEventListener('input', (e) => {
            let newValue = e.target.value;
            this.setVal(vm, expr, newValue)
        })
        updateFn && updateFn(node, this.getVal(vm, expr));
    },
    updater: {
        // 文本更新
        textUpdater(node, value) {
            node.textContent = value;
        },
        // 输入框更新
        modelUpdater(node, value) {
            node.value = value;
        }
    }
}