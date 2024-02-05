import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { request } from '@umijs/max';
import { Button, Space } from 'antd';
import { uniqBy } from 'lodash';
import { ReactNode, useEffect, useState } from 'react';
import Draggable from './Draggable';
import Droppable from './Droppable';

type ListType = { id: string; dom: ReactNode }[];

const containers: ('left' | 'middle' | 'right')[] = ['left', 'middle', 'right'];

export default function Index() {
  const [dragStartId, setDragStartId] = useState<
    'top' | 'left' | 'middle' | 'right'
  >();
  const [list, setList] = useState<{
    top: ListType;
    left: ListType;
    middle: ListType;
    right: ListType;
  }>({ top: [], left: [], middle: [], right: [] });
  const renderDragList = () => {
    const nodeArr: ListType = [];
    for (let i = 0; i < 10; i++) {
      nodeArr.push({
        id: `module${i + 1}`,
        dom: (
          <Draggable key={i} id={`module${i + 1}`}>
            拖动我{i + 1}
          </Draggable>
        ),
      });
    }
    setList((prev) => ({ ...prev, top: nodeArr }));
  };

  const handleDragStart = (e: DragStartEvent) => {
    const { active: { id: currentDragId } = {} } = e;
    (Object.keys(list) as ('top' | 'left' | 'middle' | 'right')[]).forEach(
      (key) => {
        if (list[key].some((item) => item.id === currentDragId)) {
          setDragStartId(key);
        }
      },
    );
  };

  function handleDragEnd(e: DragEndEvent) {
    const {
      // top left middle right
      over: { id: containerId } = {},
      // module1 module2 module3.......
      active: { id: dragModuleId } = {},
    } = e;

    if (containerId) {
      // console.log(list[dragStartId]);

      setList((prev) => ({
        ...prev,
        // 删减的
        [dragStartId!]: prev?.[dragStartId]?.filter(
          (item) => item.id !== dragModuleId,
        ),
        // 增加的
        [containerId]: uniqBy(
          [
            ...prev[containerId],
            prev?.[dragStartId]?.find((item) => item.id === dragModuleId),
          ],
          'id',
        ),
      }));
      return;
    }
  }

  useEffect(() => {
    renderDragList();
  }, []);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Droppable id="top" wrapStyle={{ width: '100%', height: 68 }}>
          {list.top.map(({ dom }) => dom)}
        </Droppable>

        {containers.map((id) => (
          <Droppable
            key={id}
            id={id}
            wrapStyle={{ width: '33%', minHeight: 80 }}
          >
            {list?.[id]?.map(({ dom }) => dom)}
          </Droppable>
        ))}
      </div>

      <Space>
        <Button
          onClick={() => {
            request('/api');
          }}
        >
          加载
        </Button>
        <Button
          type="primary"
          onClick={() => {
            request('/api/login');
          }}
        >
          Login
        </Button>
      </Space>
    </DndContext>
  );
}
