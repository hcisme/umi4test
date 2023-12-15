import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  antd: {
    configProvider: {},
    // appConfig: {},
  },
  theme: {
    /**
     * 定制主题
     * ~antd/lib/style/themes/default.less
     */
    'primary-color': '#08979C',

    // dark theme
    // 'menu-dark-color': '#ffffff59',
    'disabled-color': 'rgba(0, 0, 0, .45)', // 失效色
    'select-multiple-item-disabled-color': 'rgba(0, 0, 0, 0.45)',
    'disabled-bg': '#f5f5f5b3',
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {},
  routes,
  npmClient: 'npm',
});
