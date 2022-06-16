import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
// 导入模块所有的变量名
import * as directives from '@/directives'
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false
// 定义一个全局指令，所有页面都可以使用
// Vue.directive('bordered', directives.border)
// Vue.directive('imagError', directives.imgError)
// 批量注册
Object.keys(directives).forEach((key) => {
  console.log('指令名：', key, directives[key])
  // 注册自定义指令
  Vue.directive(key, directives[key])
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
