import Watcher from './watcher'
export const complieUtils = {
    //通过表达式, vm获取data中的值, person.name
    getValue(expr, vm) {
        return expr.split(".").reduce((data, currentVal) => {
            return data[currentVal]
        }, vm.$data)
    },
    //通过表达式,vm,输入框的值,实现设置值,input中v-model双向数据绑定
    setVal(expr, vm, inputVal) {
        expr.split(".").reduce((data, currentVal) => {
            data[currentVal] = inputVal
        }, vm.$data)
    },
    //获取值
    getContentVal(expr, vm) {
        //解析{{}}的形式
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getValue(args[1], vm)
        })
    },
    //处理text指令
    text(node, expr, vm) {
        let value;
        if (/\{\{.+?\}\}/.test(expr)) {
            //处理 {{}}
            value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
                //绑定观察者/更新函数
                new Watcher(vm, args[1], () => {
                    //第二个参数,传入回调函数
                    this.updater.updaterText(node, this.getContentVal(expr, vm))
                })
                return this.getValue(args[1], vm)
            })
        } else {
            //v-text
            new Watcher(vm, expr, (newVal) => {
                this.updater.updaterText(node, newVal)
            })
            //获取到value值
            value = this.getValue(expr, vm)
        }
        //调用更新函数
        this.updater.updaterText(node, value)
    },
    //处理html指令
    html(node, expr, vm) {
        const value = this.getValue(expr, vm)
        //绑定watcher
        new Watcher(vm, expr, (newVal) => {
            this.updater.updaterHtml(node, newVal)
        })
        //更新dom元素的操作
        this.updater.updaterHtml(node, value)
    },
    //处理model指令
    model(node, expr, vm) {
        const value = this.getValue(expr, vm)
        //绑定watcher
        new Watcher(vm, expr, (newVal) => {
            this.updater.updaterModel(node, newVal)
        })
        //双向数据绑定
        node.addEventListener("input", (e) => {
            //设值方法
            this.setVal(expr, vm, e.target.value)
        })
        this.updater.updaterModel(node, value)
    },
    //on指令
    on(node, expr, vm, paramName) {
        //获取methods中的方法
        let fn = vm.$options.methods && vm.$options.methods[expr]
        //为dom节点绑定相应的事件
        node.addEventListener(paramName, fn.bind(vm), false)
    },
    //bind绑定
    bind(node, expr, vm, paramName) {
        // v-bind:href='xxx' => href='xxx'
        const value = this.getValue(expr, vm)
        //设置属性
        this.updater.updaterAttr(node, paramName, value)
    },

    //更新dom元素的方法
    updater: {
        //更新文本
        updaterText(node, value) {
            node.textContent = value
        },
        //更新html
        updaterHtml(node, value) {
            node.innerHTML = value
        },
        //更新输入框内容
        updaterModel(node, value) {
            node.value = value
        },
        //更新属性
        updaterAttr(node, key, value) {
            node.setAttribute(key, value);
        }
    }
}