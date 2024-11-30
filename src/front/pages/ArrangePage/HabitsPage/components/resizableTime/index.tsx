import React, { useState, useEffect, useRef } from 'react';
import { Resizable } from 're-resizable';
import classNames from 'classnames'

import styles from './index.scss'
import { convertMinutesToHoursAndMinutes } from '@/front/utils/basicMethod'
import EditTimeDiv from '../editTimeDiv'

interface ResizableDivProps {
	isLast: boolean
	provided: any
	data: any
	isDraging: boolean
	isResizing: boolean
	resize: (value: boolean) => void
}
const ResizableDiv = ({isLast, provided, data, isDraging, isResizing, resize}: ResizableDivProps) => {
  const [height, setHeight] = useState(40);
  const [outsideHeight, setOutsideHeight] = useState(44);
	const itemRef = useRef(null)
	const insideRef = useRef(null)
	const outsideRef = useRef(null)
	const [topDistance, setTopDistance] = useState<number>(0)
	const [endTime, setEndTime] = useState<[number, number]>([0, 0])
	const [startTime, setStartTime] = useState<[number, number]>([0, 0])

  const handleResizeStop = (e: any, direction: any, ref: any, d: any) => {
    const newHeight = height + d.height;
    const nearestMultipleOf4 = Math.round(newHeight / 4) * 4;
    setHeight(nearestMultipleOf4);
		resize(false)
  };

	const handleResizeOutsideStop = (e: any, direction: any, ref: any, d: any) => {
		const nearestMultipleOf4 = Math.round(d.height / 4) * 4;
    const newOutHeight = outsideHeight + nearestMultipleOf4;
		setOutsideHeight(newOutHeight)
		resize(false)
  };

	const updateEndTime = (hours: number, minutes: number) => {
		setEndTime([hours, minutes])
	}

	useEffect(() => {
		const endDistance = height + topDistance
		const { hours, minutes } = convertMinutesToHoursAndMinutes(endDistance)
		setEndTime([hours, minutes])
	}, [topDistance, height])

	useEffect(() => {
    if (isResizing === false && isDraging === false) {
      const rect = itemRef.current.getBoundingClientRect();
      const distance = rect.top - 88;
			setTopDistance(distance)
    }
  }, [isResizing, isDraging]);

  return (
		<div 
			ref={provided.innerRef}
			{...provided.draggableProps}
			style={{
				...provided.draggableProps.style,
			}}
		>
			<Resizable
    	  defaultSize={{
    	    width: '100%',
    	    height: outsideHeight,
    	  }}
    	  size={{
    	    width: '100%',
    	    height: outsideHeight,
    	  }}	
				minHeight={height}
				ref={outsideRef}
				className={classNames([styles.outside, {[styles.borderBottom]: !isDraging && !isLast}])}
    	  onResizeStop={handleResizeOutsideStop} 
    	  onResizeStart={() => resize(true)}
    	  enable={{
    	    top: false,
    	    right: false,
    	    bottom: isLast ? false : true,
    	    left: false,
    	    topRight: false,
    	    bottomRight: false,
    	    bottomLeft: false,
    	    topLeft: false,
    	  }}
    	>
				<Resizable
					defaultSize={{
						width: '100%',
						height,
					}}
					size={{
						width: '100%',
						height,
					}}
					maxHeight={isLast ? 576 - topDistance : outsideHeight}
					minHeight={28}
					ref={insideRef}
					className={classNames([styles.inside, {[styles.borderBottom]: !isDraging}])}
					onResizeStop={handleResizeStop}
					onResizeStart={() => resize(true)}
					enable={{
						top: false,
						right: false,
						bottom: true,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false,
					}}
				>
    	  	<div className={styles.timeItem} ref={itemRef} {...provided.dragHandleProps}>
    	  	  {data.content}
    	  	</div>
					{!isDraging && <div className={styles.endTime}><EditTimeDiv hours={endTime[0]} minutes={endTime[1]} onChange={(hours:number, minutes:number) => updateEndTime(hours, minutes)}/></div>}
				</Resizable>
				{(!isDraging && !isLast) && <div className={styles.startTime}>11:11</div>}
    	</Resizable>
		</div>
			
  );
};

export default ResizableDiv;