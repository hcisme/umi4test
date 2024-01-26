import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  antd: {
    configProvider: {
      theme: {
        components: {
          Menu: {
            itemBorderRadius: 0,
            subMenuItemBorderRadius: 0,
            itemHoverColor: '#1890ff',
            itemSelectedColor: '#1890ff',
            itemSelectedBg: '#e6f7ff',
            activeBarWidth: 3,
            activeBarHeight: 3,
            activeBarBorderWidth: 3,
            itemMarginInline: 0,
            itemHoverBg: 'transparent',
          },
        },
      },
    },
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {},
  routes,
  npmClient: 'npm',
});
