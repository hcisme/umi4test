import { ArrowRightOutlined } from '@ant-design/icons';
import { Modal, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { nameMap, tabKeyMap } from '../config';

export type DataType = { errors: string[]; name: string[]; warning: any[] };

export interface IErrorModalRefProps {
  opened: (value: IOpenedParamsProps) => void;
  closed: () => void;
}

type IOpenedParamsProps = {
  errors: DataType[];
  setActiveKey: (key: string) => void;
};

const Index = (_: any, ref: any) => {
  const [open, setOpen] = useState(false);
  /**
   * 改变tab key的方法
   */
  const changeTabRef = useRef<{ change: (key: string) => void }>();
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  const opened = ({ errors, setActiveKey }: IOpenedParamsProps) => {
    setDataSource(errors);
    changeTabRef.current = { change: setActiveKey };
    setOpen(true);
  };

  const closed = () => {
    setDataSource([]);
    setOpen(false);
  };

  useImperativeHandle(
    ref,
    () => ({
      opened,
      closed,
    }),
    [],
  );

  const columns: ColumnsType<DataType> = [
    {
      title: '字段',
      dataIndex: 'name',
      render: (text) => {
        const errorInfo = Object.entries(nameMap).find(
          ([, v]) => v.join() === text.join(),
        );

        return `${tabKeyMap[text[0] as keyof typeof tabKeyMap]}-${
          errorInfo?.[0] || ''
        }`;
      },
    },
    {
      title: '提示信息',
      dataIndex: 'errors',
    },
    {
      title: '追踪',
      dataIndex: 'options',
      width: 80,
      render: (_, record) => {
        return (
          <a
            onClick={() => {
              closed();
              changeTabRef.current?.change(record.name[0]);
            }}
          >
            <ArrowRightOutlined />
          </a>
        );
      },
    },
  ];

  return (
    <Modal title="未填写字段" open={open} onCancel={closed} footer={false}>
      <Table
        rowKey={(record) => record.name.join('')}
        pagination={false}
        dataSource={dataSource}
        columns={columns}
      />
    </Modal>
  );
};

export default forwardRef(Index);
