import Vue from 'vue'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
// 引入echarts
import * as echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
// 导入vue插件注册的全局组件
import Components from './components'
// 国际化导入
import i18n from '@/lang'

Vue.use(ElementUI, {
  i18n: (k, v) => i18n.t(k, v)
})
Vue.use(Components)

import '@/icons' // icon
import '@/permission' // permission control
// 导入指令模块所有的变量名
import * as directives from '@/directive'
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// 入口中混入全局方法
import checkPoints from '@/mixin/index'
// 注册混入
Vue.mixin(checkPoints)

Vue.use(echarts)
// 导入echarts插件并注册
import echartsPlugins from '@/utils/plugins'

Vue.use(echartsPlugins)

Vue.config.productionTip = false
// 定义一个全局指令，所有页面都可以使用
// Vue.directive('bordered', directives.border)
// Vue.directive('imagError', directives.imgError)
// 批量注册自定义指令
Object.keys(directives).forEach((key) => {
  // console.log('指令名：', key, directives[key])
  // 注册自定义指令
  Vue.directive(key, directives[key])
})
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
