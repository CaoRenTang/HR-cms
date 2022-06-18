// 1.导入请求方法
import request from '@/utils/request'
/** 获取部门接口数据，渲染静态树形结构
 * @return Promise
 */
export const getDepartmentsAPI = () => {
  return request({
    url: '/company/department'
  })
}
