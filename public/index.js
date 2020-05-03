import Vue from '../src/vue.js'
const vm = new Vue({
    el: "#app",
    data: {
        person: {
            name: "monk",
            age: "18"
        },
        msg: "vue 响应式",
        htmlStr: "这是html的内容",
        arr: [1, 2, 3],
        href:"https://www.baidu.com"

    },
    methods: {
        handleClick: function () {
            // console.log('这是一个处理点击事件的方法');
            // this.person.name = "young monk"
            this.arr.push(1)
            console.log(this.arr)
        }
    }
})