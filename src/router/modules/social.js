// 父组件路由
import Layout from '@/layout'
export default {
  path: '/social',
  component: Layout,
  children: [{
    // 员工管理子页面
    path: '',
    // 后期权限控制
    name: 'social',
    component: () => import('@/views/social'),
    meta: { title: '社保', icon: 'table' }
  }]
}
