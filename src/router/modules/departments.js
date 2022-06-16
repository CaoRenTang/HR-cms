// 父组件路由
import Layout from '@/layout'
export default {
  path: '/departments',
  component: Layout,
  children: [{
    // 员工管理子页面
    path: '',
    // 后期权限控制
    name: 'departments',
    component: () => import('@/views/departments'),
    meta: { title: '组织架构', icon: 'tree' }
  }]
}
