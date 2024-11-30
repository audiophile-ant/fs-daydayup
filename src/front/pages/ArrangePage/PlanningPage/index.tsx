import React, { useEffect } from 'react';
import Demo from '../HabitsPage/components/resizableTime'

import styles from './index.scss';

const PlanningPage = () => {
	useEffect(() => {
		console.log('PlanningPage')
	})
  return (
    <div className={styles.container} >
		<Demo />

		</div>
  );
}

export default PlanningPage;