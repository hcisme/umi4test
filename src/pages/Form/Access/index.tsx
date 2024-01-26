import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, Table } from 'antd';
import React from 'react';

const initialValues = {
  users: [
    { name: 'chc', age: 20 },
    { name: '十多年', age: 240 },
    { name: '而某些', age: 120 },
  ],
};

type FormValues = { users: { name: string; age: string; [k: string]: any }[] };

const App: React.FC = () => {
  const onFinish = (values: FormValues) => {
    console.log(
      values.users.map((item) => ({ name: item.name, age: item.age })),
    );
  };

  return (
    <Card>
      <Form onFinish={onFinish} initialValues={initialValues}>
        <Form.List name="users">
          {(fields, { add, remove }) => {
            return (
              <Table
                dataSource={fields}
                pagination={false}
                columns={[
                  {
                    title: '姓名',
                    dataIndex: 'name',
                    render: (_, record) => {
                      return (
                        <Form.Item
                          {...record}
                          name={[record.name, 'name']}
                          noStyle
                        >
                          <Input />
                        </Form.Item>
                      );
                    },
                  },
                  {
                    title: '年龄',
                    dataIndex: 'age',
                    render: (_, record) => (
                      <Form.Item
                        {...record}
                        name={[record.name, 'age']}
                        noStyle
                      >
                        <Input />
                      </Form.Item>
                    ),
                  },
                  {
                    title: '操作',
                    render: (_, record) => (
                      <a>
                        <DeleteOutlined onClick={() => remove(record.name)} />
                      </a>
                    ),
                  },
                ]}
                title={() => (
                  <Space>
                    <Button onClick={add}>增加</Button>
                    <Button htmlType="submit">提交</Button>
                  </Space>
                )}
              />
            );
          }}
        </Form.List>
      </Form>
    </Card>
  );
};

export default App;
