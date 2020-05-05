import Observer from './observer'
import Complie from './compile'
export default class Vue {
    constructor(options) {
        //获取模板
        this.$el = options.el;
        //获取data中的数据
        this.$data = options.data;
        //将对象中的属性存起来,以便后续使用
        this.$options = options
        //1.数据劫持,设置setter/getter
        new Observer(this.$data)
        //2.编译模板,解析指令
        new Complie(this.$el, this)
        if (this.$el) { //如果有模板
            //代理this
            this.proxyData(this.$data)
        }
    }
    proxyData(data) {
        for (const key in data) {
            //将当前的数据放到全局指向中
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