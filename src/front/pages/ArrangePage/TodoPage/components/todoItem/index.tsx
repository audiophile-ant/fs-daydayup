import React, { useEffect, useState, useRef } from 'react';
import { CaretUpFilled, PlusOutlined } from '@ant-design/icons'
import classNames from 'classnames';
import _ from 'lodash';

import styles from './index.scss';
import { operationList } from './constants'



const TodoIcons = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0" style={{ position: 'absolute', zIndex: -1, opacity: 0 }}>
    <defs>
      <linearGradient id="boxGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="25" y2="25">
        <stop offset="0%" stopColor="#27FDC7" />
        <stop offset="100%" stopColor="#0FC0F5" />
      </linearGradient>

      <linearGradient id="lineGradient">
        <stop offset="0%" stopColor="#0FC0F5" />
        <stop offset="100%" stopColor="#27FDC7" />
      </linearGradient>

      <path id="todoLine" stroke="url(#lineGradient)" d="M21 12.3h168v0.1z" />
      <path id="todoBox" stroke="url(#boxGradient)" d="M21 12.7v5c0 1.3-1 2.3-2.3 2.3H8.3C7 20 6 19 6 17.7V7.3C6 6 7 5 8.3 5h10.4C20 5 21 6 21 7.3v5.4" />
      <path id="todoCheck" stroke="url(#boxGradient)" d="M10 13l2 2 5-5" />
      <circle id="todoCircle" cx="11" cy="10" r="5" />
    </defs>
  </svg>
);
interface TodoItemState {
	id: string;
	content: string;
	open?: boolean;
	children?: any[];	
}

interface TodoItemProps {
	data: TodoItemState;
	rank: number;
	handleChange?: ({data}: handleChangeParams) => void;
}

interface handleChangeParams {
	open: boolean, 
	id: string, 
	data?: any
}

const TodoItem = ({data, handleChange, rank}: TodoItemProps) => {
	if (!data) return null;
	const { id, content, open, children } = data;

	return (
		<>
			<div className={styles.todoItemBox} style={{marginLeft: rank * 20 + 'px'}}>
				<div className={classNames([styles.todoOpen, {[styles.totate]: !open}])} onClick={() => handleChange({open: !open, id})}>{children && <CaretUpFilled />}</div>
				<div>
					<label className={styles.todo}>
  				  <input className={styles.todoState} type="checkbox" />
  				  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 26" className={styles.todoIcon}>
  				    <use xlinkHref="#todoLine" className={styles.todoLine} />
  				    <use xlinkHref="#todoBox" className={styles.todoBox} />
  				    <use xlinkHref="#todoCheck" className={styles.todoCheck} />
  				    <use xlinkHref="#todoCircle" className={styles.todoCircle} />
  				  </svg>
  				  <div className={styles.todoText}>{content}</div>
  				</label>
				</div>
				<div className={styles.operation}>
					{operationList.map((item: any, index: number) => {
						return <div key={index} data-hovertip={item.name} className={styles.operationItem}>
							{item.icon}
						</div>
					})}
					{/* <div className="tip" aria-hidden="true">
					  <div className="tip__track">	
					    <div>About</div>
					    <div>Work</div>
					    <div>Posts</div>
					  </div>
					</div> */}
				</div>
				<div className={styles.addbtn}>
					<PlusOutlined />
				</div>
			</div>
			{open && children?.map((item: any, index: number) => {
					return <TodoItem key={index} data={item} handleChange={handleChange} rank={rank + 1}/>
				})
			}
		</>		
	)
}

const TodoList = () => {
	const todoListRef = useRef(null)
	const [todoList, setTodoList] = useState<TodoItemState>(null)
	const [showExtraBoxes, setShowExtraBoxes] = useState(false);
  const [dynamicHeight, setDynamicHeight] = useState(40);

	function addOpenProperty(data: any) {
    let newData = _.cloneDeep(data);
    function traverse(node: any) {
        if (node.content && node.children) {
            if (node.children.length > 0) {
                node.open = false;
                node.children.forEach((child: any) => {
                    traverse(child); 
                });
            }
        }
    }
    traverse(newData);
    setTodoList(newData);
}

	function handleChange({open, id, data}: handleChangeParams){
		const newData = data || _.cloneDeep(todoList)
    if (newData.id === id) {
			newData.open = open;
			if(!data){
				setTodoList(newData);

			}
			const heightData = open ? 31*newData.children.length : -31*newData.children.length
			setDynamicHeight(heightData + dynamicHeight)
			return true
		}
		if (newData.children && newData.children.length > 0) {
    	for (const child of newData.children) {
    	    if (handleChange({open, id, data: child})) {
							setTodoList(newData); 
							let newshowExtraBoxes = !showExtraBoxes
							setShowExtraBoxes(newshowExtraBoxes)
    	        return true; 
    	    }
    	}
		}
		return false; 
	}
	const data = {
		id: '1',
		content: '今天',
		children:[
			{
				id: '2',
				content: '昨天',
				children:[{
					id: '3',
					content:'明天'
				}]
			},
			{
				id: '4',
				content: '今天'
			}
		]
	}

	useEffect(() => {
		addOpenProperty(data)
	},[])
  return (
    <div>
      <TodoIcons/>
			<div className={styles.todoList} ref={todoListRef} style={{ height: dynamicHeight + 'px' }}>
				<TodoItem data={todoList} handleChange={handleChange} rank={0}/>
			</div>
    </div>
  );
}

export default TodoList;