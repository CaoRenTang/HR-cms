// 父组件路由
import Layout from '@/layout'
export default {
  path: '/salarys',
  component: Layout,
  children: [{
    // 员工管理子页面
    path: '',
    // 后期权限控制
    name: 'salarys',
    component: () => import('@/views/salarys'),
    meta: { title: '工资', icon: 'money' }
  }]
}
