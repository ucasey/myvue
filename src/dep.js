// 订阅者收集器
export default class Dep {
    constructor() {
        //管理的watcher的数组
        this.subs = []
    }
    addSubs(watcher) {
        //添加watcher
        this.subs.push(watcher)
    }
    notify() {
        //通知watcher更新dom
        this.subs.forEach(w => w.update())
    }
}