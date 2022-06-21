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
