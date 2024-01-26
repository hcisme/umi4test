import { useDroppable } from '@dnd-kit/core';
import React, { CSSProperties, ReactNode } from 'react';

export default function Index(props: {
  id: string;
  children: ReactNode;
  wrapStyle?: CSSProperties;
}) {
  const { id, children, wrapStyle } = props;

  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 4,
        color: isOver ? 'green' : undefined,
        border: `${isOver ? '3px dashed green' : '1px dashed black'}`,
        margin: '16px 0',
        ...wrapStyle,
      }}
    >
      {children}
    </div>
  );
}
