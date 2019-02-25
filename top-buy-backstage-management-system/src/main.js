// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入公共样式
import Public from './assets/css/public.css'
// 引入字体小图标
import IconFont from './assets/css/iconfont.css'
// 引入swiper的css样式
import 'swiper/dist/css/swiper.css'
// 引入echarts
import echarts from 'echarts'
// 引入删除按钮的css样式
import animate from "./assets/css/animate.css"
import dialog from "./assets/css/dialog.css"

// 引入axios
import axios from 'axios'
// 使用axios
Vue.prototype.axios = axios
// 引入qs(主要用于post请求)
import qs from 'qs'
// 使用qs
Vue.prototype.qs = qs

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
// 实现跨域请求时，每次ajax请求都是新的session，导致无法获取登录信息，所有的请求都被判定为未登陆
// axios 默认不发送cookie，需要全局设置true发送cookie
axios.defaults.withCredentials=true

/* eslint-disable no-new */
Vue.config.silent = true;
new Vue({
    el: '#app',
    router,
    render(h) {
        return h(App)
    }
})
