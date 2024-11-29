import React, { useEffect } from 'react';

import styles from './index.scss';

const PlanningPage = () => {
	useEffect(() => {
		console.log('PlanningPage')
	})
  return (
    <div className={styles.container} />
  );
}

export default PlanningPage;