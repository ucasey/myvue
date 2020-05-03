// 订阅者
export default class Dep {
    constructor() {
        //管理的watcher
        this.subs = []
    }
    addSubs(watcher) {
        //添加watcher
        this.subs.push(watcher)
    }
    notify() {
        //通知watcher更新dom
        console.log("通知watcher 更新数据", this.subs)
        this.subs.forEach(w => w.update())
    }
}