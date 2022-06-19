// 1.导入request模块
import request from '@/utils/request'
/**
 * @description: 获取角色列表
 * @param {*} params:{page, pagesize}
 * @return {*}
 */
export const getRoleListAPI = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}
/**
 * @description: 新增角色
 * @param {*} data {name,description}
 * @return {*}
 */
export const addRoleAPI = (data) => {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  })
}
