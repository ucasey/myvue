import Vue from '../src/vue.js'
const vm = new Vue({
    el: "#app",
    data: {
        person: {
            name: "monk",
            age: "18"
        },
        textStr: "vue 响应式的text指令",
        htmlStr: "vue 响应式的html指令",
        modelStr: "monk",
        arr: [1, 2, 3],
        href:"https://www.baidu.com"

    },
    methods: {
        handleClick: function () {
            this.person.name = "the young monk"
            this.arr.push(Math.floor(Math.random()*10))
        }
    }
})