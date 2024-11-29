import React, { useState, useEffect, useRef } from 'react';
import { editMenu } from "@/front/utils/constants"
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';

import styles from './index.scss'; // 确保引入你的CSS文件

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const itemsRef = useRef([]);
  const indicatorRef = useRef(null);

	const navigate = useNavigate();
  const handleIndicator = (el: any) => {
		if(!indicatorRef.current) return
		indicatorRef.current.style.left = el.offsetLeft + 'px';
		indicatorRef.current.style.width = el.offsetWidth + 'px';
  };

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
		navigate(`/admin/edit/${editMenu[index].navAddress}`)
  };

	useEffect(() => {
    const activeItem = itemsRef.current[activeIndex];
    handleIndicator(activeItem);
  }, [activeIndex]);

  return (
    <div className={styles.nav}>
			{ editMenu.map((item: any, index: number) => 
				<div
					key={index}
      	  className={classnames([styles.navItem, {[styles.isActive]: activeIndex === index}])}
      	  ref={el => itemsRef.current[index] = el}
      	  onClick={() => handleItemClick(index)}
      	>
      	  {item.name}
      	</div>
			)}
      <span data-indicator="indicator" className={styles.navIndicator} ref={indicatorRef} />
    </div>
  );
};

export default Navbar;