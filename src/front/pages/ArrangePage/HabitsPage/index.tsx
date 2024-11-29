import React, { useEffect } from 'react';

import Demo from '@/front/components/demo/dnd'
import styles from './index.scss';

const HabitsPage = () => {
	useEffect(() => {
		console.log('HabitsPage')
	})
  return (
    <div className={styles.container} >
			<Demo />
		</div>
  );
}

export default HabitsPage;