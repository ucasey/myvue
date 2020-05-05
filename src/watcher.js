import Dep from './dep'
import { complieUtils } from './utils'
export default class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        //回调函数
        this.cb = cb
        this.oldVal = this.getOldVal()
    }
    getOldVal() {
        //将当前的watcher绑定起来
        Dep.target = this
        //获取旧数据
        const oldVal = complieUtils.getValue(this.expr, this.vm)
        //下次调用的时候将watcher去掉，防止重复
        Dep.target = null
        return oldVal
    }
    update() {
        const newVal = complieUtils.getValue(this.expr, this.vm)
        if (newVal !== this.oldVal || Array.isArray(newVal)) {
            this.cb(newVal)
        }
    }
}