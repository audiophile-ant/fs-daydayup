import { convertHoursAndMinutesToHeight, convertMinutesToHoursAndMinutes } from '@/front/utils/basicMethod';
import classNames from 'classnames';
import { Resizable } from 're-resizable';
import React, { useEffect, useRef, useState } from 'react';
import EditTimeDiv from '../editTimeDiv';
import styles from './index.scss';


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
  const [outsideHeight, setOutsideHeight] = useState(50);
	const itemRef = useRef(null)
	const insideRef = useRef(null)
	const outsideRef = useRef(null)
	const [topDistance, setTopDistance] = useState<number>(0)
	const [endTime, setEndTime] = useState<[number, number]>([0, 0])
	const [startTime, setStartTime] = useState<[number, number]>([0, 0])
	const [totalTime, setTotalTime] = useState<string>('00:20')
	const [preChangeHeight, setPreChangeHeight] = useState<number | null>(null)

	// 内外部拖动改变高度
	const handleResize = (e: any, direction: any, ref: any, d: any) => {
    let newHeight = preChangeHeight + d.height;  
		if(newHeight % 2 !== 0){
			newHeight += 1
		}
    setHeight(newHeight);
		if(isLast){
			setOutsideHeight(newHeight + 4)
		}
  };
	const handleResizeOutside = (e: any, direction: any, ref: any, d: any) => {
    let newOutHeight = preChangeHeight + d.height;
		if(newOutHeight % 2 !== 0){
			newOutHeight += 1
		}
		setOutsideHeight(newOutHeight)
	}
	// 记录拖动前高度 
	const handleResizeStart = (type: 'outside' | 'inside') => {
		resize(true)
		if(type === 'outside'){
			setPreChangeHeight(outsideHeight)
		}else {
			setPreChangeHeight(height)
		}
	}

	// 更新编辑时间内容 
	const updateEndTime = (hours: number, minutes: number) => {
		setEndTime([hours, minutes])
		const nowheight = convertHoursAndMinutesToHeight(hours, minutes)
		setHeight(nowheight - topDistance)
		if(isLast){
			setOutsideHeight(nowheight - topDistance + 4)
		}
	}
	const updateStartTime = (hours: number, minutes: number) => {
		setStartTime([hours, minutes])
		const nowheight = convertHoursAndMinutesToHeight(hours, minutes)
		setOutsideHeight(nowheight - topDistance)
	}

	// 时间补零
	const formatTime = (val: number) => val.toString().padStart(2, '0');

	// 监听变形和排序更新时间
	useEffect(() => {
		const endDistance = height + topDistance
		const { hours, minutes } = convertMinutesToHoursAndMinutes(endDistance)
			setEndTime([hours, minutes])
			const { hours: totalHours, minutes: totalMinutes } = convertMinutesToHoursAndMinutes(height)
			let totalTime = formatTime(totalHours) + ':' + formatTime(totalMinutes)
			setTotalTime(totalTime)
	}, [topDistance, height])

	useEffect(() => {
		const startDistance = outsideHeight + topDistance
		const { hours, minutes } = convertMinutesToHoursAndMinutes(startDistance)
			setStartTime([hours, minutes])
	}, [topDistance, outsideHeight])

	useEffect(() => {
    if (isResizing === false && isDraging === false) {
      const rect = itemRef.current.getBoundingClientRect();
      const distance = rect.top - 226;
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
    	  onResizeStop={() => resize(false)} 
    	  onResize={handleResizeOutside} 
    	  onResizeStart={() => handleResizeStart('outside')}
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
					maxHeight={isLast ? 480 - topDistance : outsideHeight}
					minHeight={30}
					ref={insideRef}
					className={classNames([styles.inside, {[styles.borderBottom]: !isDraging}])}
					onResizeStop={() => resize(false)}
					onResizeStart={() => handleResizeStart('inside')}
					onResize={handleResize}
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
					<div className={styles.totalTime}>时长 {totalTime}</div>
					{!isDraging && <div className={styles.endTime}><EditTimeDiv hours={endTime[0]} minutes={endTime[1]} onChange={updateEndTime}/></div>}
				</Resizable>
				{(!isDraging && !isLast) && <div className={styles.startTime}><EditTimeDiv hours={startTime[0]} minutes={startTime[1]} onChange={updateStartTime}/></div>}
    	</Resizable>
		</div>
			
  );
};

export default ResizableDiv;