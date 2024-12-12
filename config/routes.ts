export default [
  { path: '/', redirect: '/ExampleChart' },
  { name: '示例图表', path: '/ExampleChart', icon: 'CopyOutlined', component: './ExampleChart' },
  {
    name: '添加图表',
    path: '/AddChart',
    icon: 'FormOutlined',
    component: './AddChart',
  },
  { name: '我的图表', path: '/MyChart', icon: 'PieChartOutlined', component: './MyChart' },
  { path: '*', layout: false, component: './404' },
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' },
    ],
  },
];
