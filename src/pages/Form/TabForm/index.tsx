import { Button, Form, Input, Tabs } from 'antd';
import { useRef, useState } from 'react';
import ErrorModal, { IErrorModalRefProps } from './ErrorModal';
import { tabKeyMap } from './config';

const dealValue = (values: any) => {
  const result = Object.values(values).reduce(
    (prev: any, item: any) => ({ ...prev, ...item }),
    {},
  );

  console.log(result);
};

const Index = () => {
  const [form] = Form.useForm();
  const errorModalRef = useRef<IErrorModalRefProps>();
  const [activeKey, setActiveKey] = useState('one');

  const submit = async () => {
    try {
      let values = await form.validateFields();
      values = dealValue(values);
      console.log(values);
    } catch (error: any) {
      errorModalRef.current?.opened({
        errors: error.errorFields,
        setActiveKey,
      });
    }
  };

  return (
    <>
      <Form form={form}>
        <Tabs
          onChange={(key) => {
            setActiveKey(key);
          }}
          activeKey={activeKey}
          items={[
            {
              forceRender: true,
              children: (
                <>
                  <Form.Item
                    label="姓名"
                    name={['one', 'name']}
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </>
              ),
            },
            {
              forceRender: true,
              children: (
                <>
                  <Form.Item
                    label="密码"
                    name={['two', 'password']}
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </>
              ),
            },
            {
              forceRender: true,
              children: (
                <>
                  <Form.Item
                    label="账号"
                    name={['three', 'account']}
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </>
              ),
            },
          ].map((item, i) => {
            const key = Object.keys(tabKeyMap)[i] as keyof typeof tabKeyMap;
            return { ...item, key, label: tabKeyMap[key] };
          })}
        />

        <Button htmlType="submit" onClick={submit}>
          提交
        </Button>
      </Form>

      <ErrorModal ref={errorModalRef} />
    </>
  );
};

export default Index;
