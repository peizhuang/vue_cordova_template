// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import axios from 'axios'
import cordova from './cordova'

import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App'

Vue.config.productionTip = false
window.cordovaLog = true

axios.defaults.withCredentials = true
axios.defaults.timeout = 15000
axios.defaults.baseURL = ''
console.log(12)

axios.interceptors.request.use((config) => {
}, (error) => {
  console.error(error)
})

axios.interceptors.response.use((response) => {
}, (error) => {
  console.error(error)
})
Vue.prototype.$axios = axios

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    /* 对于未匹配的路径, 跳转到正在建设页面：提示正在建设中 */
    next('/construction')
  } else {
    document.title = to.meta.title
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App},
  mounted () {
    cordova.event.onReady()
  }
})
