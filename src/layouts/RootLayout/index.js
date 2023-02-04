import ProLayout, { RouteContext } from '@ant-design/pro-layout';
import React from 'react';
import {
  history,
  Link,
  Outlet,
  useAppData,
  useLocation,
  useRouteData,
} from '@umijs/max';

const findAccessibleMenuItem = (menuItems) => {
  const menuItem = menuItems?.find(
    (item) =>
      item.unaccessible === false && item.hideInMenu !== true && item.name,
  );
  if (menuItem) {
    return menuItem.children
      ? findAccessibleMenuItem(menuItem.children)
      : menuItem;
  }
  return null;
};

const Index = (props) => {
  useLocation();

  const { clientRoutes } = useAppData();
  const { route } = useRouteData();
  const currentRoute = clientRoutes.find((item) => item.id === route.id);

  return (
    <ProLayout
      layout="mix"
      splitMenus
      fixSiderbar
      fixedHeader
      collapsedButtonRender={() => null}
      onMenuHeaderClick={() => history.push('/')}
      route={currentRoute}
      menuItemRender={(itemProps) => {
        const { icon, name, path } = itemProps;
        return <Link to={path}>{name}</Link>;
      }}
      subMenuItemRender={(itemProps) => {
        const { icon, name, children } = itemProps;
        const accessibleMenuItem = findAccessibleMenuItem(children);
        return (
          <Link to={accessibleMenuItem?.path} style={{ color: 'inherit' }}>
            {name}
          </Link>
        );
      }}
    >
      <RouteContext.Consumer>
        {(value) => {
          return <Outlet />;
        }}
      </RouteContext.Consumer>
    </ProLayout>
  );
};

export default Index;
