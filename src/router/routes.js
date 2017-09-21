/**
 * Created by san on 2017/9/15.
 */
const Construction = resolve => require(['@/components/Construction'], resolve)

const HomePage = resolve => require(['@/components/HomePage'], resolve)

export default [
  {
    path: '/construction',
    name: 'construction',
    component: Construction,
    meta: {title: '页面正在建设中'}
  },
  {
    path: '/',
    name: 'HomePage',
    meta: {
      title: 'vue_cordova_home'
    },
    component: HomePage
  }
]
