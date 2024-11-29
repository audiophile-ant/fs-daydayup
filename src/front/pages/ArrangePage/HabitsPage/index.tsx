import React, { useEffect } from 'react';

import styles from './index.scss';

const HabitsPage = () => {
	useEffect(() => {
		console.log('HabitsPage')
	})
  return (
    <div className={styles.container} />
  );
}

export default HabitsPage;