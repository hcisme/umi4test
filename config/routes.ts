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
    name: '权限演示',
    path: '/access',
    component: './Access',
    access: 'canSeeAdmin',
  },
  {
    name: ' CRUD 示例',
    path: '/table',
    component: './Table',
  },
];

export default routes;
