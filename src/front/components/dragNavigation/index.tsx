import styles from './index.scss'

import React, { useEffect, useState } from "react";

// import { navigation } from "./constants"
import classNames from 'classnames'


const Navigation: React.FC = () => {

	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [activeIndex, setActiveIndex] = useState<number>(0);
  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

	useEffect(() => {
	})
	return (
		// <div>
		<div className={classNames([styles.menuBox, { [styles.open]: isMenuOpen }])}>
		 	<div className={styles.hamburgerMenu} onClick={toggleMenu}>
		 	  <span />
		 	  <span />
		 	  <span />
		 	</div> 
      <div className={classNames([styles.menuItem, { [styles.active]: activeIndex === 0 }])}>
          <svg className={styles.icon} viewBox="0 0 24 24">
              <path d="M6.7,4.8h10.7c0.3,0,0.6,0.2,0.7,0.5l2.8,7.3c0,0.1,0,0.2,0,0.3v5.6c0,0.4-0.4,0.8-0.8,0.8H3.8C3.4,19.3,3,19,3,18.5v-5.6c0-0.1,0-0.2,0.1-0.3L6,5.3C6.1,5,6.4,4.8,6.7,4.8z" />
              <path d="M3.4,12.9H8l1.6,2.8h4.9l1.5-2.8h4.6" />
          </svg>
      </div>
      <div className={styles.menuItem}>
          <svg className={styles.icon} viewBox="0 0 24 24">
              <path d="M3.4,11.9l8.8,4.4l8.4-4.4" />
              <path d="M3.4,16.2l8.8,4.5l8.4-4.5" />
              <path d="M3.7,7.8l8.6-4.5l8,4.5l-8,4.3L3.7,7.8z" />
          </svg>
      </div>
      <div className={styles.menuItem}>
          <svg className={styles.icon} viewBox="0 0 24 24">
              <path d="M5.1,3.9h13.9c0.6,0,1.2,0.5,1.2,1.2v13.9c0,0.6-0.5,1.2-1.2,1.2H5.1c-0.6,0-1.2-0.5-1.2-1.2V5.1C3.9,4.4,4.4,3.9,5.1,3.9z" />
              <path d="M4.2,9.3h15.6" />
              <path d="M9.1,9.5v10.3" />
          </svg>
      </div>
      <div className={styles.menuItem}>
          <svg className={styles.icon} viewBox="0 0 24 24">
              <path d="M5.1,3.9h13.9c0.6,0,1.2,0.5,1.2,1.2v13.9c0,0.6-0.5,1.2-1.2,1.2H5.1c-0.6,0-1.2-0.5-1.2-1.2V5.1C3.9,4.4,4.4,3.9,5.1,3.9z" />
              <path d="M5.5,20l9.9-9.9l4.7,4.7" />
              <path d="M10.4,8.8c0,0.9-0.7,1.6-1.6,1.6c-0.9,0-1.6-0.7-1.6-1.6C7.3,8,8,7.3,8.9,7.3C9.7,7.3,10.4,8,10.4,8.8z" />
          </svg>
      </div>

        </div>
	)
}

export default Navigation