// 父组件路由
import Layout from '@/layout'
export default {
  path: '/attendances',
  component: Layout,
  children: [{
    // 员工管理子页面
    path: '',
    // 后期权限控制
    name: 'attendances',
    component: () => import('@/views/attendances'),
    meta: { title: '考勤', icon: 'skill' }
  }]
}
