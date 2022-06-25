// 父组件路由
import Layout from '@/layout'

export default {
  path: '/permission',
  component: Layout,
  children: [{
    // 员工管理子页面
    path: '',
    // 后期权限控制
    name: 'permissions',
    component: () => import('@/views/permission'),
    meta: {title: '权限管理', icon: 'lock'}
  }]
}
