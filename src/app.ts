import { RuntimeConfig } from '@umijs/max';
import { usePrimaryColor } from './hooks';

// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout: RuntimeConfig['layout'] = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { primaryColor, primaryHoverColor } = usePrimaryColor();

  return {
    title: false,
    menu: {
      locale: false,
    },
    layout: 'mix',
    splitMenus: true,
    rightContentRender: false,
    collapsedButtonRender: false,
    siderWidth: 160,
    token: {
      header: {
        colorBgMenuItemHover: primaryHoverColor,
        colorBgMenuItemSelected: primaryHoverColor,
        colorTextMenuSelected: primaryColor,
        colorTextMenu: 'black',
        colorTextMenuActive: primaryColor,
      },
      sider: {
        colorBgMenuItemHover: primaryHoverColor,
        colorBgMenuItemSelected: primaryHoverColor,
        colorTextMenuSelected: primaryColor,
        colorTextMenu: 'black',
        colorTextMenuActive: primaryColor,
      },
    },
  };
};
