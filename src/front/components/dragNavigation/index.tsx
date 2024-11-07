import styles from './index.scss'

import React, { useState } from "react";

import { navigation } from "../../utils/constants"
import { useUpdateEffect } from '@/front/utils/hooks';
import classNames from 'classnames'
import  Draggable  from 'react-draggable';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';


const Navigation: React.FC = () => {

	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // 菜单状态
	const [activeIndex, setActiveIndex] = useState<number>(0); // 选中item的id
	const [bgLeft, setBgLeft] = useState<number>(0); // 选中item的背景球位置
	const [isDragging, setIsDragging] = useState<boolean>(false); // 拖动状态
	const [startPosition, setStartPosition] = useState<{ x: number; y: number } | null>(null); // 开始拖动的位置
	const [left, setLeft] = useState<string>('8px'); // 悬浮球left或right
	const [right, setRight] = useState<string>('auto');
  const dragThreshold = 20; // 设定阈值为10px

	const navigate = useNavigate();

	// 处理点击悬浮球事件
  const toggleMenu = () => {
		if (isDragging) return;
		let nowOpen = isMenuOpen;
    setIsMenuOpen(prevState => !prevState);
		
		// 背景位移初始化
		if(!nowOpen){
			setTimeout(() => {
				const bgBox = document.querySelector('[data-bgcircle="circle"]') as HTMLElement;
				const { left } = bgBox.getBoundingClientRect();
				let oldBgLeft = bgLeft
				if(left === oldBgLeft){
					handleBgMove()
				}else {
					// 通过监听bgleft的改动来移动背景，避免useState的异步问题
					setBgLeft(left)
				}
			}, 200)
		}else{
			// 回收背景
			const bgBox = document.querySelector('[data-bgcircle="circle"]') as HTMLElement;
			gsap.killTweensOf("[data-bgcircle='circle']");
			gsap.to(bgBox,  {
				duration: 0.1,
				x: 0,
				width: '3.0625rem', 
				height: '2.9375rem', 
				ease: 'none',
			})
		}
  };

	// 背景位移函数
	const handleBgMove = () => {
		const bgBox = document.querySelector('[data-bgcircle="circle"]') as HTMLElement;
    const activeBox = document.querySelector('[data-active="active"]') as HTMLElement;

    if (bgBox && activeBox) {
      const { left } = activeBox.getBoundingClientRect();

      // 使用GSAP进行背景位移
      gsap.to(bgBox, {
        keyframes: [
          {
            duration: 0.3,
            x: (left - bgLeft),
            width: '3.5rem',
            height: '2.5rem',
            ease: 'none',
          },
					{
            duration: 0.1,
            x: left - bgLeft - 2,
            width: '2.9375rem', 
            height: '3.125rem', 
            ease: 'none',
          },
					{
            duration: 0.1,
            x: (left- bgLeft),
            width: '3.0625rem', 
            height: '2.9375rem', 
            ease: 'none',
          },
        ],
      })
    }
	}

	// 处理导航点击事件
	const handleNav = (index: number) => {
		setActiveIndex(index)
		// 跳转到对应的页面
		navigate(`/admin/${navigation[index].navAddress}`)
	}

	// 处理悬浮球拖拽影响
	const handleDragStop = (e: any, data: {x: number, y: number}) => {
		setTimeout(() => {
			setIsDragging(false)
		}, 300)

		// 设置/清除悬浮球left或right来控制其宽度展开方向
		if(!isDragging) return
		const menuBox = document.querySelector('[data-menu="menu"]') as HTMLElement;
		const viewportWidth = window.innerWidth;
		if(menuBox.getBoundingClientRect().left > viewportWidth / 2){
      setLeft('auto')
			setRight(`${viewportWidth - 56}px`)
			menuBox.style.flexDirection = 'row-reverse'
		}else {
 			setLeft('0px')
			setRight('auto')
			menuBox.style.flexDirection = 'row'
		}
		setStartPosition(null)
	}


	const handleDrag = (e: any, data: { x: number; y: number }) => {
		if (startPosition) {
			const distanceX = Math.abs(data.x - startPosition.x);
			const distanceY = Math.abs(data.y - startPosition.y);

			// 只有当水平或垂直距离超过阈值时才开始拖动
			if (distanceX > dragThreshold || distanceY > dragThreshold) {
				if(isMenuOpen) toggleMenu();
				setIsDragging(true); // 触发拖动状态
			}
		}
};

	// 处理悬浮球开始拖拽影响
	const handleDragStart = (e: any) => {
		setStartPosition({ x: e.clientX, y: e.clientY });
	}
	useUpdateEffect(() => {
		handleBgMove()
	}, [activeIndex])

	useUpdateEffect(() => {
		handleBgMove()
	}, [bgLeft])
	
	return (
		<Draggable
			onStop={(e, data) => handleDragStop(e, data)}
			onDrag={(e, data) => handleDrag(e, data)}
			onStart={(e) => handleDragStart(e)}
			bounds={{ left: 0, top: 0, right: window.innerWidth - 56, bottom: window.innerHeight - 100 }}
		>
			<div 
				style={{left: left, right: right }} 
				data-menu="menu" 
				className={classNames([styles.menuBox, { [styles.open]: isMenuOpen }])}
			>
				<div className={styles.bgCircle} data-bgcircle="circle"/>
			 	<div className={styles.hamburgerMenu} onClick={toggleMenu}>
			 	  <span />
			 	  <span />
			 	  <span />
			 	</div>
				{navigation.map((item, index) => {
					return(
						<div 
							key={index} 
							className={classNames([styles.menuItem, { [styles.active]: activeIndex === index }]) }
							data-active={ activeIndex === index ? 'active' : undefined}
							onClick={() => handleNav(index)}
							data-hovertip={item.name}
						>
    	  		  <svg className={styles.icon} viewBox="0 0 24 24">
								{item.paths.map((path: string, index: number) => (
									<path key={index} d={path}/>
								))}
    	  		  </svg>
    	  		</div>
					)	
				})}      
    	</div>
		</Draggable>	
	)
}

export default Navigation