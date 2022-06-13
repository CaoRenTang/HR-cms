import axios from 'axios'
// 消息提示的方法
import { Message } from 'element-ui'
// 导入vuex实例
import store from '@/store'
// import { getToken } from '@/utils/auth'

// 通过axios.create方法创建了一个新axios实例并配置后台基础地址
// 说明❓：service和axios用法一样
const service = axios.create({
  // 动态配置后台请求的基础地址
  baseURL: process.env.VUE_APP_BASE_API // url = base url + request url
})

// 1. 请求拦截器=》发请求之前执行
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 场景：统一添加请求头=》把token加入到请求中
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
// 2. 响应拦截器 =》请求响应了执行
service.interceptors.response.use(
  response => {
    // 状态码2xx 走到这里
    const res = response.data
    return res
  },
  error => {
    // 状态码2xx以外 走到这里
    console.log('err' + error) // for debug
    // 场景：如果token失效了，状态码 401，删除token重新登录
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
