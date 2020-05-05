import { complieUtils } from './utils'
export default class Complie {
    constructor(el, vm) {
        this.el = this.isNodeElement(el) ? el : document.querySelector(el);
        this.vm = vm;
        // 1、将所有的dom对象放到fragement文档碎片中,防止回流
        const fragments = this.nodeTofragments(this.el)
        // 2、编译模板
        this.complie(fragments)
        // 3、追加子元素到根元素
        this.el.appendChild(fragments)
    }
    complie(fragments) {
        //获取所有节点
        const nodes = fragments.childNodes;
        [...nodes].forEach(ele => {
            if (this.isNodeElement(ele)) {
                //1. 编译元素节点
                this.complieElement(ele)
            } else {
                //编译文本节点
                this.complieText(ele)
            }
            //如果有子节点,循环遍历,编译指令
            if (ele.childNodes && ele.childNodes.length) {
                this.complie(ele)
            }
        })
    }
    complieElement(node) {
        //1.获取所有的属性
        const attrs = node.attributes;
        //2.筛选出是属性的
        [...attrs].forEach(attr => {
            //attr是一个对象,name是属性名,value是属性值
            const {
                name,
                value
            } = attr
            //判断是否含有v-开头
            if (name.startsWith("v-")) {
                //将指令分离
                const [, directive] = name.split("-") //text,html,on:click
                const [dirName, paramName] = directive.split(":") //处理on:click或bind:name的情况 on,click
                //编译模板
                complieUtils[dirName](node, value, this.vm, paramName)
                //删除属性
                node.removeAttribute(name)
            } else if (name.startsWith("@")) {
                // 如果是事件处理 @click='handleClick'
                let [, paramName] = name.split('@');
                complieUtils['on'](node, value, this.vm, paramName);
                node.removeAttribute('@' + paramName);
            } else if (name.startsWith(":")) {
                // 如果是事件处理 :href='...'
                let [, paramName] = name.split(':');
                complieUtils['bind'](node, value, this.vm, paramName);
                node.removeAttribute(':' + paramName);
            }
        })

    }
    complieText(node) {
        //1.获取所有的文本内容
        const text = node.textContent
        //匹配{{}}
        if (/\{\{(.+?)\}\}/.test(text)) {
            //编译模板
            complieUtils['text'](node, text, this.vm)
        }
    }
    nodeTofragments(el) {
        //获取文档中的dom节点,将dom节点加到文档碎片中
        const f = document.createDocumentFragment()
        let firstChild;
        while (firstChild = el.firstChild) {
            f.appendChild(firstChild)
        }
        return f
    }
    isNodeElement(el) {
        //判断是否是元素还是文本
        return el.nodeType === 1;
    }
}