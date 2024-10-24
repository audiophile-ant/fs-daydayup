
import React, { useEffect, useState, useRef } from 'react';
import { Select, DatePicker, ConfigProvider } from 'antd';
import { EditFilled, CaretUpFilled, PlusOutlined, ContainerOutlined } from '@ant-design/icons';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import classNames from 'classnames';
import _ from 'lodash';

import styles from './index.scss';
import{ sortType, gearsSvg, operationList } from './constants'
import './moudle.scss'
import 'dayjs/locale/zh-cn';
import TodoModalPage from '../todoModal'

dayjs.locale('zh-cn');
gsap.registerPlugin(ScrollTrigger);



interface TodoContentProps {
	selectIndex: number
	contentItems: Array<any>
}



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
	id: number;
	content: string;
	open?: boolean;
	children?: any[];	
}

interface TodoItemProps {
	data: TodoItemState;
	rank: number;
	handleChange?: ({data}: handleChangeParams) => void;
	setContent?: (content: string) => void;
	setFatherId?: (id: number) => void;
	setShowModal?: (show: boolean) => void;
}

interface handleChangeParams {
	open: boolean, 
	id: number, 
	data?: any
}

const TodoItem = ({data, handleChange, rank, setContent, setFatherId, setShowModal}: TodoItemProps) => {
	if (!data) return null;
	const { id, content, open, children } = data;
	const [isChecked, setIsChecked] = useState<boolean>(false);

	const handleClick = (e:any, id: number) => {
		if(!children){
			setIsChecked(e.target.checked);
		}
	}

	const handleAddClick = () => {
		setContent(null);
		setFatherId(id);
		setShowModal(true)
	}
	return (
		<>
			<div className={styles.todoItemBox} style={{marginLeft: rank * 20 + 'px'}}>
				<div className={classNames([styles.todoOpen, {[styles.totate]: !open}])} onClick={() => handleChange({open: !open, id})}>{children && <CaretUpFilled />}</div>
				<div>
					<label className={styles.todo}>
  				  <input className={styles.todoState} type="checkbox" checked={isChecked} onChange={(e) => handleClick(e, id)}/>
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
					<div data-remark={`备注:${'无'}`} className={styles.operationItem}>
						<ContainerOutlined />
					</div>
					{operationList.map((item: any, index: number) => {
						return <div key={index} data-hovertip={item.name} className={styles.operationItem}>
							{item.icon}
						</div>
					})}
				</div>
				<div className={styles.addbtn} data-hovertip="添加子任务" onClick={handleAddClick}>
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

const TodoContent: React.FC<TodoContentProps> = ({selectIndex, contentItems}) => {

	const beltRef = useRef(null);
  const gearsRef = useRef(null);
	const [showModal, setShowModal] = useState(false);
	const [fatherId, setFatherId] = useState<number | null>(null);
	const [content, setContent] = useState<string | null>(null);
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
		id: 1,
		content: '今天',
		children:[
			{
				id: 2,
				content: '昨天',
				children:[{
					id: 3,
					content:'明天'
				}]
			},
			{
				id: 4,
				content: '今天'
			}
		]
	}

	useEffect(() => {
		addOpenProperty(data)
	},[])

	const handleAddChange = (e: any) => {
		setShowModal(true);
		setContent(e.target.value)
		setFatherId(null)
		e.target.value = ''
	}

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
				<div className={styles.todoListBox}>
					<div>
    		  	<TodoIcons/>
						<div className={styles.todoList} ref={todoListRef} style={{ height: dynamicHeight + 'px' }}>
							<TodoItem data={todoList} handleChange={handleChange} rank={0} setContent={setContent} setFatherId={setFatherId} setShowModal={setShowModal}/>
						</div>
						{showModal && <TodoModalPage visible={showModal} onOk={() => setShowModal(false)} onCancle={() => setShowModal(false)} father={fatherId} content={content}/>}
    			</div>
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
					<input type='text' className={styles.addTodoInput} placeholder='添加待办事项' onBlur={e => handleAddChange(e)}/>
				</div>
			</div>  
		</div>
  );
}

export default TodoContent;