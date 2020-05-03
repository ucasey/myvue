import { arrayMethods } from './array'
import Dep from './dep'
export default class Observer {
  constructor(data) {
    //数据劫持
    this.observer(data)
  }
  defineReactive(data, key, value) {
    this.observer(value)
    //创建订阅者/收集依赖
    const dep = new Dep()
    //setter和getter处理
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get() {
        //当Dep有watcher时，添加watcher
        Dep.target && dep.addSubs(Dep.target)
        // this.__dep__ = dep
        return value
      },
      set: (newVal) => {
        //新旧数据不相等时更改
        if (value !== newVal) {
          this.observer(newVal);
          value = newVal
          dep.notify()
        }
      }
    })
  }

  observer(data) {
    //判断是否是数组
    if (Array.isArray(data)) {
      data.__proto__ = arrayMethods
      // data.__ob__ = this
      return
    }
    //数据劫持
    if (data && typeof data === "object") {
      for (const key in data) {
        this.defineReactive(data, key, data[key])
      }
    }
  }
}