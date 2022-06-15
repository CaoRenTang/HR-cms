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

export function getUserInfoAPI() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
