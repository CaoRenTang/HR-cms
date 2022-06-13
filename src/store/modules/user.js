/**
 * 存储用户信息,token、个人信息
 */
import { getToken, setToken, removeToken } from '@/utils/auth.js'
import { loginAPI } from '@/api/user'
export default {
  // 模块化加锁
  namespaced: true,
  // 1.定义变量
  state: {
    token: getToken() || ' '
  },
  // 2.修改变量（同步）
  mutations: {
    // 设置token
    setToken(state, token) {
      // 设置token
      state.token = token
      // 持久化储存token(防止刷新丢token)
      setToken(token)
    },
    // 删除token(退出登录)
    delToken(state) {
      state.token = ''
      removeToken()
    }
  },
  // 3.调用后台接口发送请求（异步）
  actions: {
    async loginAction(ctx, loginForm) {
      const token = await loginAPI(loginForm)
      console.log('获取到的token：', token)
      ctx.commit('setToken', token)
    }
  }
}
