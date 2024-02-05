import { menuMap } from '@/menu';
import { PageContainer } from '@ant-design/pro-components';
import { useLocation, useNavigate } from '@umijs/max';
import { Button, Card, TabPaneProps } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import styles from './index.less';

interface IProps {
  children: ReactNode;
}

const Index = (props: IProps) => {
  const { children } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [domList, setDomList] = useState<(TabPaneProps & { key: any })[]>([]);
  const [activeKey, setActiveKey] = useState<string>();
  const { pathname } = location;

  useEffect(() => {
    if (pathname === '/') {
      navigate('/home');
    } else {
      setActiveKey(pathname);
    }

    if (
      domList.every((item) => item.key !== pathname) &&
      Object.keys(menuMap).includes(pathname)
    ) {
      setDomList((prev) => [
        ...prev,
        {
          tab: menuMap[pathname as keyof typeof menuMap],
          key: pathname,
          children: <Card>{children}</Card>,
          forceRender: true,
        },
      ]);
    }
  }, [pathname]);

  return (
    <PageContainer
      className={styles['project-page-container']}
      breadcrumbRender={false}
      tabActiveKey={activeKey}
      onTabChange={(key) => {
        navigate(key);
      }}
      tabBarExtraContent={
        <Button
          onClick={() => {
            if (domList.length !== 1) {
              setDomList((prev) =>
                prev.filter((item) => item.key === pathname),
              );
            }
          }}
          type="link"
        >
          清除其他
        </Button>
      }
      tabList={domList}
      tabProps={{
        type: domList.length === 1 ? 'card' : 'editable-card',
        hideAdd: true,
        onEdit: (key, action) => {
          if (action === 'remove') {
            const newDomList = domList.filter((item) => item.key !== key);
            setDomList(newDomList);

            if (pathname === key) {
              navigate(newDomList[0].key);
            }
          }
        },
      }}
      header={{
        title: '',
        style: {
          padding: 0,
        },
      }}
    />
  );
};

export default Index;
