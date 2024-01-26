import { useDraggable } from '@dnd-kit/core';
import React, { ReactNode } from 'react';

export default function Index(props: { id: string; children: ReactNode }) {
  const { id, children } = props;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  return (
    <div>
      <button
        ref={setNodeRef}
        style={{
          transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        }}
        {...listeners}
        {...attributes}
      >
        {children}
      </button>
    </div>
  );
}
