import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: false,
  title: 'Template',
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/',
      component: '@/layouts/RootLayout',
      routes: [
        {
          name: '首页',
          path: '/home',
          component: './Home',
        },
        {
          name: '权限演示',
          path: '/access',
          component: './Access',
        },
        {
          // access: 'qwer',
          name: ' CRUD 示例',
          path: '/table',
          routes: [
            {
              path: '/table',
              redirect: '/table/son',
            },
            {
              name: '表格',
              path: 'son',
              component: './Table/Son',
            },
          ],
        },
      ],
    },
  ],
  npmClient: 'npm',
});
