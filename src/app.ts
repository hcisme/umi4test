import { RuntimeConfig } from '@umijs/max';
import { usePrimaryColor } from './hooks';

// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout: RuntimeConfig['layout'] = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const primaryColor = usePrimaryColor();

  return {
    title: false,
    menu: {
      locale: false,
    },
    layout: 'mix',
    splitMenus: true,
    rightContentRender: false,
    collapsedButtonRender: false,
    token: {
      header: {
        colorTextMenuSelected: primaryColor,
        colorTextMenuActive: primaryColor,
      },
      sider: {
        colorTextMenuSelected: primaryColor,
        colorTextMenuActive: primaryColor,
      },
    },
  };
};

// export const antd: RuntimeAntdConfig = (memo: any) => {
//   memo.theme ??= {
//     token: {
//       borderRadius: 8,
//     },
//   };
//   // memo.theme.algorithm = theme.darkAlgorithm; // 配置 antd5 的预设 dark 算法

//   return memo;
// };
