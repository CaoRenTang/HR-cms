import store from '@/store'

/**
 *  mixin全局混入
 *  好处作用：复用组件逻辑
 */
export default {
  data() {
    return {
      // 全局混入变量
      num: 1000
    }
  }, // 全局混入公共方法
  methods: {
    /**
     * 检查当前登录人是否可以使用某个按钮权限：
     * 1. 获取登录人按钮权限点数据（points），进行是否有权限判断=> 返回true|false
     *    1. points数组中拥有身份标识：显示按钮
     *    2. points数组中没有有身份标识：不显示按钮
     * 2. 在需要做权限控制页面下的按钮上使用=》v-if="checkPoints(当前按钮功能的身份标识)"
     */
    /**
     * @param {*} point 检测的权限点标识（身份象征）
     */
    checkPoints(point) {
      const {userInfo} = store.state.user
      // return points.includes(point)
      // 解决退出时报错
      return userInfo.roles?.points.includes(point)
    }
  }
}
