// 父组件路由
import Layout from '@/layout'

export default {
  path: '/employees',
  component: Layout,
  children: [{
    // 员工管理子页面
    path: '',
    // 后期权限控制
    name: 'employees',
    component: () => import('@/views/employees'),
    meta: {title: '员工管理', icon: 'people'}
  },
    // 员工详情
    {
      path: 'detail/:id',
      component: () => import('@/views/employees/detail'),
      hidden: true, // 不在左侧菜单显示
      meta: {
        title: '员工详情'
      }
    }
  ]
}
