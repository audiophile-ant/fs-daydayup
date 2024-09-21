// import { Draggable } from 'react-draggable';
import anime from 'animejs';
import React, { useEffect, useRef, useState } from 'react';

const Item = ({ icon, backgroundColor, preRef, nextRef }) => {
	const ref = useRef(null);
	const [isMoving, setIsMoving] = useState(false)
	let timeout: any = null
	const moveTo = (item: any) => {
			anime({
					targets: ref.current,
					left: item.current.getBoundingClientRect().left,
					top: item.current.getBoundingClientRect().top,
					duration: 700,
					elasticity: 500
			});
			if (nextRef) {
				nextRef.current.moveTo(item);
			}
	}

	const updatePosition = () => {
		anime({
				targets: ref.current,
				left: preRef.current.getBoundingClientRect().left,
				top: preRef.current.getBoundingClientRect().top,
				duration: 700,
				elasticity: 500
		});
		if (nextRef) {
			nextRef.current.updatePosition();
		}
  }

	const handleMouseMove = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (nextRef.current && isMoving) {
        nextRef.current.moveTo(ref);
      }
    }, 10);
  };

	useEffect(() => {
		if (ref.current) {
      ref.current.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('mousemove', handleMouseMove);
      }
      clearTimeout(timeout);
    };
	}, [ref.current, isMoving])
  return (
      <div
				ref={ref}
        style={{
          backgroundColor
        }}
        className={`item fi-${icon}`}
      >
        <i className={`fi-${icon}`} />
      </div>
  );
};

export default Item;