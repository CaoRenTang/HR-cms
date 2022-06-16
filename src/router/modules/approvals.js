// 父组件路由
import Layout from '@/layout'
export default {
  path: '/approvals',
  component: Layout,
  children: [{
    // 员工管理子页面
    path: '',
    // 后期权限控制
    name: 'approvals',
    component: () => import('@/views/approvals'),
    meta: { title: '审批', icon: 'edit' }
  }]
}
