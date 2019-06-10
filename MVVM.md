### MVVM



![img](https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3555255493,3289244650&fm=26&gp=0.jpg)



![img](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560131031522&di=e9550a1e2e0387f303f0e82154575278&imgtype=0&src=http%3A%2F%2Fs6.sinaimg.cn%2Fmw690%2F002If1Mfzy78a9AzwA5c5%26690)

> observer.js

```javascript
class Observer {    // 数据劫持
    constructor(data) {
        this.observe(data)
    }

    observe(data) {
        // 要对这个data数据将原有的属性改成set和get形式
        // 有且要是对象才劫持
        if (!data || typeof data !== 'object') { // 不需要劫持
            return;
        }

        // 要将数据 一一劫持    先获取到data的key和value
        //console.log(Object.keys(data));
        Object.keys(data).forEach(key => {
            // 劫持
            this.defineReactive(data, key, data[key])
            this.observe(data[key]);    // 深度递归劫持
        })

    }

    // 定义响应式
    /**
     *
     * @param obj 给哪个对象
     * @param key 哪个属性
     * @param value 定义值
     */
    defineReactive(obj, key, value) {
        // 获取某个值的时候  想弹个框
        //obj.key = value;
        let that = this;
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {  // 当取值时调用的方法
                return value;
            },
            set(newValue) { // 当给data属性中设置值的时候 更改获取的属性的值
                if (newValue !== value) {
                    // 这里的this不是实例
                    that.observe(newValue);//  如果是对象，继续劫持
                    value = newValue;
                }
            }
        })
    }
}
```

以下对应observer.js中第18行

```javascript
Object.keys(data).forEach(key => {
    // 劫持
    this.defineReactive(data, key, data[key])
    this.observe(data[key]);    // 深度递归劫持
})
```

![1560136652841](C:\Users\michaelhee\AppData\Roaming\Typora\typora-user-images\1560136652841.png)

> 以下对应observer.js中43行 
>
> ```javascript
> if (newValue !== value) {
>     // 这里的this不是实例
>     that.observe(newValue);//  如果是对象，继续劫持
>     value = newValue;
> }
> ```

![1560137045738](C:\Users\michaelhee\AppData\Roaming\Typora\typora-user-images\1560137045738.png)