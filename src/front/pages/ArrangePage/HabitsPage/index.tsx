import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import ResizableDiv from './components/resizableTime';
import styles from './index.scss';


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

const initial = [
  { id: '0', content: 'Item 0' },
  { id: '999', content: 'Item 999' },
];

const HabitsPage = () => {

	const [forenoon, setForenoon] = useState(initialLeft); // 第一组
  const [afternoon, setAfternoon] = useState(initialRight); // 第二组
  const [depot, setDepot] = useState(initial); // 事件仓库
	const [isDraging, setIsDraging] = useState(false); // 是否在拖动（判断隐藏时间线）
	const [isResizing, setIsResizing] = useState(false); // 是否在拖动（判断隐藏时间线）

	const onDragstart = () => {
		setIsDraging(true)
	}
	const onDragEnd = (result: any) => {
		const { destination, source } = result;
		if (!destination) {
			return;
		}
	
		if (destination.droppableId === source.droppableId) {
			if (destination.droppableId === 'left') {
				updateInternalSort({
					currentStatus: forenoon, 
					setStatusCode: setForenoon, 
					sourceIndex: source.index, 
					destinationIndex: destination.index
				});
			} else if (destination.droppableId === 'right') {
				updateInternalSort({
					currentStatus: afternoon, 
					setStatusCode: setAfternoon, 
					sourceIndex: source.index, 
					destinationIndex: destination.index
				});
			} else {
				updateInternalSort({
					currentStatus: depot, 
					setStatusCode: setDepot, 
					sourceIndex: source.index, 
					destinationIndex: destination.index
				});
			}
		} else {
			updateCrossDrag({
				depot,
				setDepot,
				leftStatus: forenoon, 
				rightStatus: afternoon, 
				setLeftStatus: setForenoon, 
				setRightStatus: setAfternoon, 
				source, 
				destination});
		}
		setIsDraging(false);
	};
	
	// 处理内部拖动
	const updateInternalSort = ({currentStatus, setStatusCode, sourceIndex, destinationIndex}: any) => {
		const newItems = Array.from(currentStatus);
		const [removed] = newItems.splice(sourceIndex, 1);
		newItems.splice(destinationIndex, 0, removed);
		setStatusCode(newItems);
	};
	// 通用处理列表间拖动
	const commonCrossDrag = ({ firstStatus, secondStatus, setFirstStatus, setSecondStatus, source, destination }: any) => {
		const newFirstStatus = Array.from(firstStatus);
		const newSecondStatus = Array.from(secondStatus);
		const [removed] = newFirstStatus.splice(source.index, 1);
		newSecondStatus.splice(destination.index, 0, removed);
		setFirstStatus(newFirstStatus);
		setSecondStatus(newSecondStatus);
	};
	// 处理列表间拖动
	const updateCrossDrag = ({ depot, setDepot, leftStatus, rightStatus, setLeftStatus, setRightStatus, source, destination }: any) => {
		const statusMap: any = {
			left: { status: leftStatus, setStatus: setLeftStatus },
			right: { status: rightStatus, setStatus: setRightStatus },
			depot: { status: depot, setStatus: setDepot }
		};
	
		if (statusMap[source.droppableId] && statusMap[destination.droppableId]) {
			const { status: firstStatus, setStatus: setFirstStatus } = statusMap[source.droppableId];
			const { status: secondStatus, setStatus: setSecondStatus } = statusMap[destination.droppableId];
	
			commonCrossDrag({ firstStatus, secondStatus, setFirstStatus, setSecondStatus, source, destination });
		} else {
			console.error('未知的droppableId', source.droppableId, destination.droppableId);
		}
	};

  return (
			<DragDropContext onDragEnd={onDragEnd} onDragStart={onDragstart}>
				<Droppable droppableId="depot" direction='horizontal'>
          {(provided) => (
						<>
							<div className={styles.title}>日常todo仓库</div>
            	<div
            	  ref={provided.innerRef}
            	  {...provided.droppableProps}
            	  className={styles.depot}
            	>
            	  {depot.map((item, index) => (
            	    <Draggable key={item.id} draggableId={item.id} index={index}>
            	      {(provided) => (
            	        <div
            	          ref={provided.innerRef}
            	          {...provided.draggableProps}
												className={styles.timeItemBox}
            	          style={{
            	            ...provided.draggableProps.style,
            	          }}
            	        >
												<div className={styles.timeItem} {...provided.dragHandleProps}>
            	          	{item.content}
												</div>
            	        </div>
            	      )}
            	    </Draggable>
            	  ))}
            	  {provided.placeholder}
            	</div>
						</>
          )}   
        </Droppable>
				<div className={styles.title}>日常安排</div>
				<div className={styles.sleep}>睡眠</div>
				<div className={styles.container} >
        	<Droppable droppableId="left">
        	  {(provided) => (
							<div>
								<div className={styles.arrangeTitle}>开始：{}</div>
        	    	<div
        	    	  ref={provided.innerRef}
        	    	  {...provided.droppableProps}
									className={styles.timeArrange}
        	    	>
        	    	  {
										forenoon.map((item, index) => (
											<Draggable key={item.id} draggableId={item.id} index={index}>
												{(provided) => (
													<ResizableDiv
														isLast={index === forenoon.length - 1}
														provided={provided}
														data={item}
														isDraging={isDraging}
														isResizing={isResizing}
														resize={(value) => setIsResizing(value)}
														/>
												)}
											</Draggable>
										))
									}
        	    	  {provided.placeholder}
        	    	</div>
							</div>
        	  )}
        	</Droppable>
					<Droppable droppableId="right">
        	  {(provided) => (
							<div>
								<div className={styles.arrangeTitle}>续时：{}</div>
        	    	<div
        	    	  ref={provided.innerRef}
        	    	  {...provided.droppableProps}
									className={styles.timeArrange}
        	    	>
        	    	  {
										afternoon.map((item, index) => (
											<Draggable key={item.id} draggableId={item.id} index={index}>
												{(provided) => (
													<ResizableDiv
														isLast={index === afternoon.length - 1}
														provided={provided}
														data={item}
														isDraging={isDraging}
														isResizing={isResizing}
														resize={(value) => setIsResizing(value)}
														/>
												)}
											</Draggable>
										))
									}
        	    	  {provided.placeholder}
        	    	</div>
							</div>
        	  )}
        	</Droppable>
				</div>
      </DragDropContext>
  );
}

export default HabitsPage;