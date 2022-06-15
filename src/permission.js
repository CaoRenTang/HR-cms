// 导入路由实例
import router from '@/router'
// 导入vuex实例
import store from '@/store'
// 添加白名单
const VIP = ['/login', '/404']
// 引入一份进度条插件
import NProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 添加路由前置守卫
router.beforeEach((to, from, next) => {
  // 开启滚动条
  NProgress.start()
  // 有token
  if (store.getters.token) {
    // 是登录页
    if (to.path === '/login') {
      // 避免重复登录
      next('/')
    } else {
      // 不是登录页，放行,调用后台接口获取数据方法
      store.dispatch('user/getUserInfoAction')
      next()
    }
  } else {
    // 没有token，是否在白名单
    if (VIP.includes(to.path) > -1) {
    // 在白名单放行
      next()
    } else {
      // 不在白名单,跳到登录页
      next('/login')
    }
  }
  // 关闭进度条
  NProgress.done()
})
