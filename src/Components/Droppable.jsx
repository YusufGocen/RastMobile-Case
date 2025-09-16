import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div
      ref={setNodeRef}
      className={"min-h-[450px] min-w-[50px] rounded-lg p-4 flex items-center justify-center transition-colors"}
    >
      {props.children}
    </div>
  );
}