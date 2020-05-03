import Dep from './dep'
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'].forEach(ele => {
    arrayMethods[ele] = function (e) {
        arrayProto[ele].call(this, ...arguments)
        //执行渲染函数
        console.log("我执行了渲染函数")
        // 1、将开发者的参数传给原生的方法，保证数组按照开发者的想法被改变
        // 2、视图更新等
        const ob = this.__ob__
        console.log(ob)
    }
})
export {
    arrayMethods
}