import React, { useEffect } from 'react';

import styles from './index.scss';

const MemoPage = () => {
	useEffect(() => {
		console.log('MemoPage')
	})
  return (
    <div className={styles.container}>
			<div>tool</div>
			<div>toleranceconcerndoubleextravogantperceiveregonitiontechnique</div>
		</div>
  );
}

export default MemoPage;