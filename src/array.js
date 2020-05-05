// 获取Array的原型链
const arrayProto = Array.prototype;
// 重新创建一个含有对应原型的对象,在下面称为新Array
const arrayMethods = Object.create(arrayProto);
// 处理7个数组变异方法
['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'].forEach(ele => {
    //修改新Array的对应的方法
    arrayMethods[ele] = function () {
        // 执行数组的原生方法,完成其需要完成的内容
        arrayProto[ele].call(this, ...arguments)
        // 获取Observer对象
        const ob = this.__ob__
        // 更新视图
        ob.dep.notify()
    }
})
export {
    arrayMethods
}