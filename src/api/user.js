// 1.导入请求方法
import request from '@/utils/request'

/**
 *@description:登录
 * @param data {mobile, password}
 * @return {*}
 */
export function loginAPI(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

/**
 * @description:获取用户个人信息
 * @return {*}
 */
export function getUserInfoAPI() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
/**
 * @description:获取用户头像信息
 * @return {*}
 */
export function getUserDetailByIdAPI(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
