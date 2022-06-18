// 1.导入请求方法
import request from '@/utils/request'
import { id } from 'html-webpack-plugin/lib/chunksorter'
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
