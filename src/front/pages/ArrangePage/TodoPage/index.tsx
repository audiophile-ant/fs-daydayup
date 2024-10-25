import React, { useEffect, useState, useRef } from 'react';
import {
  EditOutlined,
	DeleteOutlined,
	PlusCircleOutlined
} from '@ant-design/icons';

import SearchComponent from '@/front/components/search'
import TodoContent from './components/todoContent'

import styles from './index.scss';
import classnames from 'classnames';


const TodoPage = () => {
	const [contentItems, setContentItems] = useState<Array<string>>(["工作","购物","学习","工作","购物","学习"])
	const [itemsNumber, setItemsNumber] = useState<Array<number>>([1, 1, 1, 1, 1, 1])
	const [selectType, setSelectType] = useState<number>(0)
	const [activeIndex, setActiveIndex] = useState<number>(0)
	const arrowRef = useRef<HTMLDivElement>(null)
	const tabType = ["内容分类","时间分类"]

	const handleCheck = (e: any) => {
		const selectType = e.target.checked ? 1 : 0
		setSelectType(selectType)
	}

	const handleClickTab = (index: number) => {
		let moveY = (index * 41) + 10
		arrowRef.current.style.top = moveY + 'px'
		setActiveIndex(index)
	}
  return (
    <div className={styles.container} >
			<div className={styles.operationArea} >
				<div className={styles.searchArea} >
					<SearchComponent />
				</div>
				<div className={styles.typeSwtich}>
					<label className={styles.label}>{tabType[0]}</label>
					<input id="one" className={styles.input} type="checkbox" onChange={e => handleCheck(e)}/>
    			<label htmlFor="one" className={styles.slider} />
    			<label className={styles.label}>{tabType[1]}</label>
				</div>
				<div className={styles.tabBar}>
					<div className={styles.tabName}>   
						我的{tabType[selectType]}组别
					</div>
					<div className={styles.tabContent}>	
						<div className={styles.arrow} ref={arrowRef} />
						{contentItems.map((item, index) => (
							<div key={index}>
								<div 
									className={classnames([styles.tabItem, {[styles.activeItem]: activeIndex === index}])} 
									onClick={() => handleClickTab(index)}
								>
									<input type="text" readOnly={true} value={item}/>
									<div className={styles.icon} data-hovertip="重命名"><EditOutlined /></div>
									<div className={styles.icon} data-hovertip="删除"><DeleteOutlined /></div>
									<div className={styles.number}> {itemsNumber?.[index]} </div>
								</div>
								<div className={styles.line} />
							</div>	
						))}
					</div>
				</div>
				<div className={styles.addTabItem}>
					<div className={styles.addbtn}><PlusCircleOutlined /> 添加分组</div>
				</div>
			</div>
			<TodoContent 
				selectIndex={activeIndex}
				contentItems={contentItems}
			/>
		</div>
  );
}

export default TodoPage;