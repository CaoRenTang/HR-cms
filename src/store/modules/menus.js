// 导入静态路由
import {constantRoutes} from '@/router'

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    setList(state, canLook) {
      // 将动态路由和静态路由组合起来
      state.list = [...constantRoutes, ...canLook]
    }
  }
}
