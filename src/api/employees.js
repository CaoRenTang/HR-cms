import request from '@/utils/request'

/**
 * @description: 获取下拉选择部门负责人数据
 * @return {*}
 */
export function getEmployeeSimpleAPI() {
  return request({
    url: '/sys/user/simple'
  })
}
