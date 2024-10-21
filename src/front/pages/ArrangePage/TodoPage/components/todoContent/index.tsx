
import React, { useEffect, useRef } from 'react';
import { Select, DatePicker, ConfigProvider } from 'antd';
import { EditFilled } from '@ant-design/icons';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './index.scss';
import{ sortType, gearsSvg } from './constants'
import TodoList from '../todoItem'
import './moudle.scss'
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
gsap.registerPlugin(ScrollTrigger);



interface TodoContentProps {
	selectIndex: number
	contentItems: Array<any>
}
const TodoContent: React.FC<TodoContentProps> = ({selectIndex, contentItems}) => {

	const beltRef = useRef(null);
  const gearsRef = useRef(null);

  useEffect(() => {
    const bodyScroller = {
      ease: 'none',
      scrollTrigger: {
        scroller: '#content',
        scrub: true,
        start: 0,
        end: document.querySelector('#content').scrollHeight,
      },
    };

    gsap.to(beltRef.current, {
      height: document.querySelector('#content').scrollHeight + document.querySelector('#content').clientHeight,
      ...bodyScroller,
    });

    gsap.to(gearsRef.current.children, {
      rotate: (index) => {
        return index === 0 ? (720 * 10) / 16 * -1 : 720;
      },
      ...bodyScroller,
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className={styles.todoContent} >
			<div className={styles.toolBar}>
				<div className={styles.formItem}>
					排序方式：
					<Select
    			  defaultValue="3"
    			  style={{ width: 160 }}
    			  // onChange={handleChange}
    			  options={sortType}
						popupClassName='dropdown'
    			/>
				</div>
				<div className={styles.formItem}>
					时间范围：
					<ConfigProvider locale={zhCN}>
						<DatePicker.RangePicker
							style={{ width: 200}}
							popupClassName='datePicker'
						/>
					</ConfigProvider>		
				</div>
			</div>
			<div id='content' className={styles.content}>
				<div className={styles.todoList}>
					<TodoList/>
				</div>
				<div className={styles.belt} ref={beltRef}/>
				<div className={styles.gears} ref={gearsRef}>
					{gearsSvg.map((item: any, index: number) => 
						<svg key={index} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox={item.viewBox}>
				    	<path fillRule="evenodd" clipRule="evenodd" d={item.path} fill="currentColor" />
				  	</svg>
					)}
				</div>
			</div>
			<div className={styles.addBar}>
				<div className={styles.addTodoBox}>
					<EditFilled />
					<input type='text' className={styles.addTodoInput} placeholder='添加待办事项'/>
				</div>
			</div>  
		</div>
  );
}

export default TodoContent;