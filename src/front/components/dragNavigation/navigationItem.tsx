import anime, { set } from 'animejs';
import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

interface navigationItemProps {
	icon: string;
	ref: any;
	preRef: any;
	nextRef: any;
	click: Function;
	close: Function;
	backgroundColor: string
}
const Item:React.FC = ({ icon, ref, backgroundColor, preRef, nextRef, click, close }: navigationItemProps) => {
	const nowref = useRef(null);
	const [isMoving, setIsMoving] = useState(false)
	let timeout: any = null
	const moveTo = (item: any) => {
			anime({
					targets: nowref.current,
					left: item.current.getBoundingClientRect().left,
					top: item.current.getBoundingClientRect().top,
					duration: 700,
					elasticity: 500
			});
			if (nextRef) {
				nextRef.moveTo(item);
			}
	}

	const updatePosition = () => {
		anime({
				targets: nowref.current,
				left: preRef.getBoundingClientRect().left, 
				top: preRef.getBoundingClientRect().top,
				duration: 700,
				elasticity: 500
		});
		if (nextRef) {
			nextRef.updatePosition();
		}
  }

	const handleMouseMove = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (nextRef && isMoving) {
        nextRef.moveTo(nowref.current);
      }
    }, 10);
  };

	const handleStart = () => {
		close()
    setIsMoving(true);
  };

  const handleDrag = () => {
    if (nextRef) {
      nextRef.updatePosition();
    }
  };

  const handleStop = () => {
    setIsMoving(false);
    nextRef.moveTo(nowref.current)
  };

	useEffect(() => {
		console.log(123321, preRef, nextRef)
		if (nowref.current) {
      nowref.current.addEventListener('mousemove', handleMouseMove);
    }
		if(!preRef) {
			nowref.current.addEventListener('mouseup', () => {
				if (isMoving) {
					setIsMoving(false);        
				} else {
					click();
				}
		});
		}

    return () => {
      if (nowref.current) {
        nowref.current.removeEventListener('mousemove', handleMouseMove);
      }
      clearTimeout(timeout);
    };
	}, [nowref.current, isMoving])

  return (
		preRef?
			<Draggable
				onStart={handleStart}
				onDrag={handleDrag}
				onStop={handleStop}
			>
				<div 
					ref={nowref}
        	style={{
        	  backgroundColor,
						position: 'absolute',
						width: 50,
						height: 50,
						borderRadius: '50%', 
						cursor: 'pointer',
        	}}
				>
					{123}
				</div>
			</Draggable>
			:
      <div
				ref={nowref}
        style={{
					backgroundColor,
					position: 'absolute',
					width: 50,
					height: 50,
					borderRadius: '50%', 
				}}
      >
        123
      </div>
  );
};

export default Item;