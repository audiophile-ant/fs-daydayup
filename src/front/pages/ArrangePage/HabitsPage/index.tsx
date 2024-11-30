import React, { useEffect, useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import styles from './index.scss';
import ResizableDiv from './components/resizableTime'

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

const HabitsPage = () => {

	const [leftItems, setLeftItems] = useState(initialLeft); // 时间排序
  const [rightItems, setRightItems] = useState(initialRight); // 事件仓库
	const [isDraging, setIsDraging] = useState(false); // 是否在拖动（判断隐藏时间线）
	const [isResizing, setIsResizing] = useState(false); // 是否在拖动（判断隐藏时间线）

	const onDragstart = () => {
		setIsDraging(true)
	}
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
		setIsDraging(false)
  };

  return (
    <div className={styles.container} >
			<DragDropContext onDragEnd={onDragEnd} onDragStart={onDragstart}>
        <Droppable droppableId="left">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
							className={styles.timeArrange}
            >
              {leftItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <ResizableDiv
											isLast={index === leftItems.length - 1}
											provided={provided}
											data={item}
											isDraging={isDraging}
											isResizing={isResizing}
											resize={(value) => setIsResizing(value)}
	                    />
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
              className={styles.timeArrange}
            >
              {rightItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
											className={styles.timeItem}
                      style={{
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

export default HabitsPage;