/**
 * 存储用户信息,token、个人信息
 */
export default {
  // 模块化加锁
  namespaced: true,
  // 1.定义变量
  state: {
    token: ''
  },
  // 2.修改变量（同步）
  mutations: {
    // 设置token
    setToken(state, token) {
      // 设置token
      state.token = token
    },
    // 删除token
    delToken(state) {
      state.token = ''
    }
  },
  // 3.调用后台接口发送请求（异步）
  actions: {}
}
