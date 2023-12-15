import { useToken } from '@ant-design/pro-components';

const Index = () => {
  const {
    token: { 'cyan-8': primaryColor },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useToken();

  return primaryColor;
};

export default Index;
