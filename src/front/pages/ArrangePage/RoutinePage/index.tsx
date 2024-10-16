import React, { useEffect } from 'react';

import styles from './index.scss';

const RoutinePage = () => {
	useEffect(() => {
		console.log('RoutinePage')
	})
  return (
    <div className={styles.container} />
  );
}

export default RoutinePage;