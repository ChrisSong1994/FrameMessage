import Vue from "vue"
import App from "./app"

const app = new Vue({
    el: "#app",
    template: "<App/>",
    components: { App }
})

// 实现热更新
if (module.hot) {
    module.hot.accept();
}