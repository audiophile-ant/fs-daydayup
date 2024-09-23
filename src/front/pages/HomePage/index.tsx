
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import Menu from '../../components/dragNavigation/index'
import styles from './index.scss'

const HomePage = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		const menu = document.getElementById('menu');
		if (menu) {
				setTimeout(() => {
						menu.click();
						setTimeout(() => {
								menu.click();
						}, 1000);
				}, 50);
		}
}, []);
  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
    document.body.classList.toggle('overflow-hidden');
  };

  return (
    <div className={styles.menuContainer}>
		  <div className={styles.menuWrapper} onClick={toggleMenu}>
		    <div className={classNames([styles.hamburgerMenu, { [styles.open]: isMenuOpen }])}>
		      <span />
		      <span />
		      <span />
		    </div>
	    </div>
			<Menu
        items={[
           { icon: 'list', backgroundColor: '#FFFFFF' },
    			 { icon: 'torso', backgroundColor: '#FF5C5C' },
    			 { icon: 'social-facebook', backgroundColor: '#5CD1FF' },
    			 { icon: 'paypal', backgroundColor: '#FFF15C' },
    			 { icon: 'link', backgroundColor: '#64F592' },
        ]}
      />
		</div>
  );

}

export default HomePage;