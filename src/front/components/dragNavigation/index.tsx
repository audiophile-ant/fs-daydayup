import styles from './index.scss'

import React, { useState } from "react";

import { navigation } from "./constants"
import { useUpdateEffect } from '@/front/utils/hooks';
import classNames from 'classnames'
import gsap from 'gsap';


const Navigation: React.FC = () => {

	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [activeIndex, setActiveIndex] = useState<number>(0);
  const toggleMenu = () => {
		let nowOpen = isMenuOpen;
    setIsMenuOpen(prevState => !prevState);
		if(!nowOpen){
			handleBgMove()
		}
  };

	const handleBgMove = () => {
		const bgBox = document.querySelector('[data-bgcircle="circle"]') as HTMLElement;
    const activeBox = document.querySelector('[data-active="active"]') as HTMLElement;

    if (bgBox && activeBox) {
      const { left } = activeBox.getBoundingClientRect();
      const { left: beforeLeft } = bgBox.getBoundingClientRect();
			console.log('12321', left, beforeLeft)


      // 使用GSAP进行动画
      gsap.to(bgBox, {
        keyframes: [
          // {
          //   duration: 0.3,
          //   x: (left - beforeLeft) / 2,
          //   width: '56px',
          //   height: '40px',
          //   ease: 'power1.inOut',
          // },
          {
            duration: 0.3,
            x: (left - beforeLeft),
            width: '49px', // 恢复宽度
            height: '47px', // 恢复高度
            ease: 'power1.inOut',
          }
        ],
      });
    }
	}

	const handleNav = (index: number) => {
		setActiveIndex(index)
		// 跳转到对应的页面
		
	}

	useUpdateEffect(() => {
		handleBgMove()
	}, [activeIndex])
	return (
		<div className={classNames([styles.menuBox, { [styles.open]: isMenuOpen }])}>
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
	)
}

export default Navigation