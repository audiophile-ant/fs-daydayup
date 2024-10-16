import React, { useEffect } from 'react';

import styles from './index.scss';

const MemoPage = () => {
	useEffect(() => {
		console.log('MemoPage')
	})
  return (
    <div className={styles.container} />
  );
}

export default MemoPage;