import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
import qs from 'qs'

import fontawesome from '@fortawesome/fontawesome'
import {faImages, faCheckCircle, faTimesCircle, faTimes, faAngleLeft} from '@fortawesome/fontawesome-free-solid'

import Vue from 'vue'
import router from './router'
import App from './App'

Vue.config.productionTip = false
Vue.config.devtools = true
window.cordovaLog = true

fontawesome.library.add(faImages, faCheckCircle, faTimesCircle, faTimes, faAngleLeft)

promiseFinally.shim()
axios.defaults.withCredentials = true
axios.defaults.timeout = 60000
axios.defaults.baseURL = 'http://eshop.erathinkcd.com'

axios.interceptors.request.use((config) => {
  return config
}, (error) => {
  console.error(error)
  return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
  console.log(response)
  return response.data
}, (error) => {
  console.error(error)
  return Promise.reject(error.response.data)
})
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<app></app>',
  components: {App}
})
