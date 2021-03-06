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
/**
 * @description: 删除角色
 * @param {*} id 角色id
 * @return {*}
 */
export const deleteRoleAPI = (id) => {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

/**
 * @description: 获取角色详情
 * @param {*} id 角色id
 * @return {*}
 */
export function getRoleDetailAPI(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

/**
 * @description: 编辑角色
 * @param {*} data
 * @return {*}
 */
export function updateRoleAPI(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}

/**
 *
 * @param {*} data 给角色分配权限 {id:角色id, permIds:[] 所有选中的节点的id组成的数组}
 * @returns
 */
export function assignPermAPI(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
