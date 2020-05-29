import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery'
import initCesium from "./gisMainCode/initCesium";
import initOL from "./gisMainCode/initOL";
import echarts from 'echarts'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'cesium/Widgets/widgets.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import "ol/ol.css"
import VueVideoPlayer from 'vue-video-player'

import 'video.js/dist/video-js.css' // 引入样式

import 'vue-video-player/src/custom-theme.css' // 引入样式

import 'videojs-flash'



Vue.use(VueVideoPlayer)
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(VueAxios, axios);
Vue.prototype.$echarts = echarts
Vue.prototype.$initCesium = initCesium
Vue.prototype.$initOL = initOL
Vue.prototype.$ = $
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
