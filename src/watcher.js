import Dep from './dep'
import { complieUtils } from './utils'
export default class Watcher {
    constructor(vm, expr, cb) {
        //当前的vue实例
        this.vm = vm;
        //表达式
        this.expr = expr;
        //回调函数,更新dom
        this.cb = cb
        //获取旧的数据,此时获取旧值的时候,Dep.target会绑定上当前的this
        this.oldVal = this.getOldVal()
    }
    getOldVal() {
        //将当前的watcher绑定起来
        Dep.target = this
        //获取旧数据
        const oldVal = complieUtils.getValue(this.expr, this.vm)
        //绑定完成后,将绑定的置空,防止多次绑定
        Dep.target = null
        return oldVal
    }
    update() {
        //更新函数
        const newVal = complieUtils.getValue(this.expr, this.vm)
        if (newVal !== this.oldVal || Array.isArray(newVal)) {
            //条用更新在compile中创建watcher时传入的回调函数
            this.cb(newVal)
        }
    }
}