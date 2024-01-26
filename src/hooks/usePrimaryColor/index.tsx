import { useToken } from '@ant-design/pro-components';

const Index = () => {
  const {
    token: { 'blue-6': primaryColor, 'blue-1': primaryHoverColor },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useToken();

  return { primaryColor, primaryHoverColor };
};

export default Index;
