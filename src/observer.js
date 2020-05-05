import { arrayMethods } from './array'
import Dep from './dep'
export default class Observer {
  constructor(data) {
    //数据劫持
    this.dep = new Dep() //存放数组的观察者watcher
    if (Array.isArray(data)) {
      data.__proto__ = arrayMethods
      data.__ob__ = this
      this.observerArray(data)
    } else {
      this.walk(data)
    }
  }
  walk(data) {
    //数据劫持
    if (data && typeof data === "object") {
      for (const key in data) {
        defineReactive(data, key, data[key])
      }
    }
  }

  observerArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      observer(arr[i])
    }
  }
}

export function defineReactive(data, key, value) {
  let childOb = observer(value)
  //创建订阅者/收集依赖
  const dep = new Dep()
  //setter和getter处理
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false,
    get() {
      //当Dep有watcher时，添加watcher
      Dep.target && dep.addSubs(Dep.target)
      Dep.target && childOb && childOb.dep.addSubs(Dep.target) //如果是数组，则添加上数组的观察者
      return value
    },
    set: (newVal) => {
      //新旧数据不相等时更改
      if (value !== newVal) {
        childOb = observer(newVal);
        value = newVal
        dep.notify()
      }
    }
  })
}

export function observer(data) {
  //如果是数组，择创建一个新的Observer
  if (Array.isArray(data)) {
    let ob = new Observer(data)
    return ob
  }
}