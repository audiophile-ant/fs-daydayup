import React, { useEffect } from 'react';

import styles from './index.scss';

const HolidayPage = () => {
	useEffect(() => {
		console.log('HolidayPage')
	})
  return (
    <div className={styles.container} />
  );
}

export default HolidayPage;