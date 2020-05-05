import Observer from './observer'
import Complie from './compile'
export default class Vue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        this.$options = options
        //1.数据劫持
        new Observer(this.$data)
        //2.编译模板
        new Complie(this.$el, this)
        if (this.$el) { //如果有模板
            this.proxyData(this.$data)
        }
    }
    proxyData(data) {
        for (const key in data) {
            Object.defineProperty(this, key, {
                get() {
                    return data[key];
                },
                set(newVal) {
                    data[key] = newVal
                }
            })
        }
    }
}