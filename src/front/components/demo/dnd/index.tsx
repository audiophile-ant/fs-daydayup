import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialLeft = [
  { id: '1', content: 'Item 1' },
  { id: '2', content: 'Item 2' },
  { id: '3', content: 'Item 3' },
];

const initialRight = [
  { id: '4', content: 'Item 4' },
  { id: '5', content: 'Item 5' },
  { id: '6', content: 'Item 6' },
];

function Demo() {
  const [leftItems, setLeftItems] = useState(initialLeft);
  const [rightItems, setRightItems] = useState(initialRight);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      // 内部排序
      if (destination.droppableId === 'left') {
        const newItems = Array.from(leftItems);
        const [removed] = newItems.splice(source.index, 1);
        newItems.splice(destination.index, 0, removed);
        setLeftItems(newItems);
      } else {
        const newItems = Array.from(rightItems);
        const [removed] = newItems.splice(source.index, 1);
        newItems.splice(destination.index, 0, removed);
        setRightItems(newItems);
      }
    } else {
      // 互相拖放
      if (source.droppableId === 'left') {
        const newLeftItems = Array.from(leftItems);
        const newRightItems = Array.from(rightItems);
        const [removed] = newLeftItems.splice(source.index, 1);
        newRightItems.splice(destination.index, 0, removed);
        setLeftItems(newLeftItems);
        setRightItems(newRightItems);
      } else {
        const newLeftItems = Array.from(leftItems);
        const newRightItems = Array.from(rightItems);
        const [removed] = newRightItems.splice(source.index, 1);
        newLeftItems.splice(destination.index, 0, removed);
        setLeftItems(newLeftItems);
        setRightItems(newRightItems);
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="left">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ background: 'lightblue', padding: 8, width: 200, minHeight: 200 }}
            >
              {leftItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        userSelect: 'none',
                        padding: 16,
                        margin: '0 0 8px 0',
                        background: 'white',
                        ...provided.draggableProps.style,
                      }}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="right">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ background: 'lightgreen', padding: 8, width: 200, minHeight: 200 }}
            >
              {rightItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        userSelect: 'none',
                        padding: 16,
                        margin: '0 0 8px 0',
                        background: 'white',
                        ...provided.draggableProps.style,
                      }}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Demo;