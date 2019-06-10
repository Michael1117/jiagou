### context

Koa为了能够简化API,引入上下文context概念，将原始请求对象req和响应对象res封装到context上，并且在context上设置getter和setter，从而简化操作。



```javascript
const kaikeba = {
    info: {
        name: '开课吧',
        desc: '开课吧真不错'
    },
    getName(){
        return this.info.name
    },
    setName(val){
        console.log('new name is ' + val);
        this.info.name = val;
    }
};

console.log(kaikeba.getName());
kaikeba.setName('Michael');
console.log(kaikeba.getName());
//console.log(kaikeba.name);

kaikeba.name = 'kkb';

console.log(kaikeba.name);
```

. compose.js

```javascript
function compose(middlewares) {
    return function () {
        return dispatch(0);

        // 执行第0个
        function dispatch(i) {
            let fn = middlewares[i];
            if (!fn) {
                return Promise.resolve();
            }
            return Promise.resolve(
                fn(function next() {
                    // promise完成后，再执行下一个
                    return dispatch(i + 1)
                })
            )
        }
    }
}

async function fn1(next) {
    console.log('fn1');
    await next();
    console.log("end fn1");
}

async function fn2(next) {
    console.log('fn2');
    await delay();
    await next();
    console.log("end fn2");
}


function fn3(next) {
    console.log('fn3');
}

function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("delay");
            resolve();
        },2000)
    })
}

const middlewares = [fn1, fn2, fn3];

const finalFn = compose(middlewares);
finalFn();
```