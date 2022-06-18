// 1.导入请求方法
import request from '@/utils/request'
// 组织架构页面的所有接口

/**
 * 获取部门接口数据，渲染静态树形结构
 * @return Promise
 */
export const getDepartmentsAPI = () => {
  return request({
    url: '/company/department'
  })
}
/**
 * @description: 删除部门
 * @param {*} id 当前点击的操作按钮 所在的项的id
 * @return {*}
 */
export const delDepartmentsAPI = (id) => {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
/**
 * @description: 新增子部门
 * @param {*}
  data {
            name: '', // 部门名称
            code: '', // 部门编码
            manager: '', // 部门管理者
            introduce: '', // 部门介绍
            pid: '' // 1. 顶级部门 =》传空  2. 子部门 =》传父部门的ID
        }
 * @return {*}
 */
export const addDepartmentsAPI = (data) => {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
/**
 * @description: 获取部门详情
 * @param {*} id 表示当前要编辑项的id值
 * @return {*}
 */
export function getDepartDetailAPI(id) {
  return request({
    url: `/company/department/${id}`
  })
}
/**
 * @description: 更新部门数据
 * @param {*} data:form表单数据 但是要有id值
 * @return {*}
 */
export function updateDepartmentsAPI(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
