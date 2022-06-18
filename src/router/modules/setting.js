// 父组件路由
import Layout from '@/layout'
export default {
  path: '/setting',
  component: Layout,
  children: [{
    // 员工管理子页面
    path: '',
    // 后期权限控制
    name: 'setting',
    component: () => import('@/views/setting'),
    meta: { title: '角色管理', icon: 'setting' }
  }]
}
