import Vue from 'vue'
import Router from 'vue-router'
// const Recognition = resolve => require(['@/components/FaceRecognition'], resolve)
const Sign = resolve => require(['@/components/telephone'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'FaceSign',
      meta: {
        title: 'FaceId Sign'
      },
      component: Sign
    }
  ]
})
