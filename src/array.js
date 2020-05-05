const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'].forEach(ele => {
    arrayMethods[ele] = function () {
        // 1、执行变异数组的原生方法,完成其需要完成的内容
        arrayProto[ele].call(this, ...arguments)
        // 2、视图更新等
        const ob = this.__ob__
        ob.dep.notify()
    }
})
export {
    arrayMethods
}