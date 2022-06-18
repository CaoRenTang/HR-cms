// 1.导入request模块
import request from '@/utils/request'
export const getRoleListAPI = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}
