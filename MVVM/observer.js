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
        let dep = new Dep();    // 每个变化的数据  都会对应一个数组，这个数组是存放所有更新的操作
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {  // 当取值时调用的方法
                Dep.target && dep.addSub(Dep.target)
                return value;
            },
            set(newValue) { // 当给data属性中设置值的时候 更改获取的属性的值
                if (newValue !== value) {
                    // 这里的this不是实例
                    that.observe(newValue);//  如果是对象，继续劫持
                    value = newValue;
                    dep.notify();   // 通知所有人 数据更新了
                }
            }
        })
    }
}
class Dep {
    constructor() {
        // 订阅的数组
        this.subs = []
    }
    addSub(watcher) {
        this.subs.push(watcher);
    }
    notify() {
        this.subs.forEach(watcher => watcher.update())
    }
}