import { IConfigFromPlugins } from '@@/core/pluginConfig';

const routes: IConfigFromPlugins['routes'] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    component: './Home',
  },
  {
    name: '表单',
    path: '/form',
    routes: [
      {
        path: '/form',
        redirect: '/form/tabform',
      },
      {
        name: 'Tab表单',
        path: '/form/tabform',
        component: './Form/TabForm',
      },
      {
        name: '权限演示',
        path: '/form/access',
        component: './Form/Access',
        access: 'canSeeAdmin',
      },
    ],
  },
];

export default routes;
