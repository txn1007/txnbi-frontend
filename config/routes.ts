export default [
  { path: '/', redirect: '/ExampleChart' },
  {
    name: '示例图表',
    path: '/ExampleChart',
    icon: 'CopyOutlined',
    component: './ExampleChart',
    access: 'user',
  },
  {
    name: '添加图表',
    path: '/AddChart',
    icon: 'FormOutlined',
    component: './AddChart',
    access: 'user',
  },
  {
    name: '我的图表',
    path: '/MyChart',
    icon: 'PieChartOutlined',
    component: './MyChart',
    access: 'user',
  },
  { path: '*', layout: false, component: './404' },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
      {
        name: 'register',
        path: '/user/register',
        component: './User/Register',
      },
    ],
  },
  // 运营端路由
  {
    path: '/admin/log',
    name: '日志管理',
    access: 'canOperator',
    routes: [
      {
        path: '/admin/log/list',
        name: '日志查询',
        component: './Admin/SystemMonitor/List',
      },
      {
        path: '/admin/log/delete',
        name: '日志删除',
        component: './Admin/SystemMonitor/Delete',
      },
    ],
  },
  {
    path: '/admin/user',
    name: '用户管理',
    access: 'canOperator',
    routes: [
      {
        path: '/admin/user/list',
        name: '用户查询',
        component: './Admin/UserManagement/List',
      },
      {
        path: '/admin/user/add',
        name: '添加用户',
        component: './Admin/UserManagement/Add',
      },
      {
        path: '/admin/user/edit',
        name: '修改用户',
        component: './Admin/UserManagement/Edit',
      },
      {
        path: '/admin/user/delete',
        name: '删除用户',
        component: './Admin/UserManagement/Delete',
      },
    ],
  },
  {
    path: '/admin/chart',
    name: '图表管理',
    access: 'canOperator',
    routes: [
      {
        path: '/admin/chart/list',
        name: '图表查询',
        component: './Admin/ChartManagement/List',
      },
      {
        path: '/admin/chart/add',
        name: '添加图表',
        component: './Admin/ChartManagement/Add',
      },
      {
        path: '/admin/chart/edit',
        name: '修改图表',
        component: './Admin/ChartManagement/Edit',
      },
      {
        path: '/admin/chart/delete',
        name: '删除图表',
        component: './Admin/ChartManagement/Delete',
      },
    ],
  },
];
