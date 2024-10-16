
import React, { useEffect } from 'react';

import styles from './index.scss';

interface TodoContentProps {
	selectIndex: number
	contentItems: Array<any>
}
const TodoContent: React.FC<TodoContentProps> = ({selectIndex, contentItems}) => {

  return (
    <div className={styles.todoContent} >
			<div className={styles.toolBar}>
				新建待办
				排序方式
				时间段
			</div>
			<div className='content'/>
		</div>
  );
}

export default TodoContent;