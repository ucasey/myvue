import { arrayMethods } from './array'
import Dep from './dep'
export default class Observer {
  constructor(data) {
    //用于对数组进行处理,存放数组的观察者watcher
    this.dep = new Dep() 
    if (Array.isArray(data)) {
      //如果是数组,使用数组的变异方法
      data.__proto__ = arrayMethods
      //把数组数据添加 __ob__ 一个Observer,当使用数组变异方法时,可以更新视图
      data.__ob__ = this
      //给数组的每一项添加数据劫持(setter/getter处理)
      this.observerArray(data)
    } else {
      //非数组数据添加数据劫持(setter/getter处理)
      this.walk(data)
    }
  }
  walk(data) {
    //数据劫持
    if (data && typeof data === "object") {
      for (const key in data) {
        //绑定
        this.defineReactive(data, key, data[key])
      }
    }
  }
  //循环遍历数组,为数组每一项设置setter/getter
  observerArray(items) {
    for (let i = 0; i < items.length; i++) {
      this.observer(items[i])
    }
  }
  observer(data) {
    //如果是数组,择创建一个新的Observer
    if (Array.isArray(data)) {
      //创建新的Obserber,主要目的是为了实现数组变异方法,更新视图
      let ob = new Observer(data)
      //返回Obserber
      return ob
    }else{
      this.walk(data)
    }
  }
  //数据劫持,设置 setter/getteer
defineReactive(data, key, value) {
  let arrayOb = this.observer(value)
  //创建订阅者/收集依赖
  const dep = new Dep()
  //setter和getter处理
  Object.defineProperty(data, key, {
    //可枚举的
    enumerable: true,
    //可修改的
    configurable: false,
    get() {
      //当 Dep 有 watcher 时, 添加 watcher
      Dep.target && dep.addSubs(Dep.target)
      //如果是数组,则添加上数组的观察者
      Dep.target && arrayOb && arrayOb.dep.addSubs(Dep.target) 
      return value
    },
    set: (newVal) => {
      //新旧数据不相等时更改
      if (value !== newVal) {
        //为新设置的数据添加setter/getter
        arrayOb = this.observer(newVal);
        value = newVal
        //通知 dep 数据发送了变化
        dep.notify()
      }
    }
  })
}
}
