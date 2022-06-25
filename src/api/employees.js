import request from '@/utils/request'

/**
 * @description: 获取下拉选择部门负责人数据
 * @return {*}
 */
export const getEmployeeSimpleAPI = () => {
  return request({
    url: '/sys/user/simple'
  })
}
/**
 * @description: 获取员工列表
 * @param {*} params {page:当前页,size：每页条数}
 * @return {*}
 */
export const getEmployeeListAPI = (params) => {
  return request({
    method: 'GET',
    url: '/sys/user',
    params
  })
}
/**
 * @description: 添加员工
 * @param {*} data
 * @return {*}
 */
export const getAddEmployeesAPI = (data) => {
  return request({
    method: 'POST',
    url: '/sys/user',
    data
  })
}
/**
 * @description: 删除员工
 * @param {*} id 员工id
 * @return {*}
 */
export const delEmployeeAPI = (id) => {
  return request({
    method: 'DELETE',
    url: `/sys/user/${id}`
  })
}

/**
 * @description: 导入excel批量添加员工
 * @param {*} data 包含员工信息的数组
 * @return {*}
 */
export const importEmployeesAPI = (data) => {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}

/**
 * @description: 保存员工信息
 * @param {*} data
 * @return {*}
 */
export function saveUserDetailByIdAPI(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * @description: 为用户分配角色
 * @param {*} data { id:当前用户id, roleIds:选中的角色id组成的数组 }
 * @return {*}
 */
export function assignRolesAPI(data) {
  return request({
    url: '/sys/user/assignRoles',
    data,
    method: 'put'
  })
}
