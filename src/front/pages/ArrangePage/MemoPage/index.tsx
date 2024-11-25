import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons'

import Search from '@/front/components/search';
import TagControll from './components/tagControll';
import WaterfallLayout from './components/waterfallLayout';
import MemoModalPage from './components/memoModal';
import styles from './index.scss';

const MemoPage = () => {
	const listRef = useRef(null);
	const [items, setItems] = useState<any[]>([]);
	const [showAddMemo, setShowAddMemo] = useState<boolean>(false)
	
	const init = () => {
		setItems([
			{creatTime:'2014.01.01',tag:['标签1'],content: 'qjeoweqoewqeqoeqioeqoeqqjeoweqoewqeqoeqioeqoeq'},
			{creatTime:'2014.01.01',tag:['标签1'],content: 'qjeoweqoewqeqoeqioeqoeq'},
			{creatTime:'2014.01.01',tag:['标签1'],content: 'qjeoweqoewqeqoeqioeqoeqqjeoweqoewqeqoeqioeqoeq'},
			{creatTime:'2014.01.01',tag:['标签1'],content: 'qjeoweqoewqeqoeqioeqoeqqjeoweqoewqeqoeqioeqoeq'},
			{creatTime:'2014.01.01',tag:['标签1'],content: 'qjeoweqoewqeqoeqioeqoeq'},
			{creatTime:'2014.01.01',tag:['标签1'],content: 'qjeoweqoewqeqoeqioeqoeqqjeoweqoewqeqoeqioeqoeq'},
			{creatTime:'2014.01.01',tag:['标签1'],content: 'qjeoweqoewqeqoeqioeqoeq'},
			{creatTime:'2014.01.01',tag:['标签1'],content: 'qjeoweqoewqeqoeqioeqoeqqjeoweqoewqeqoeqioeqoeq'},
		])
	}

	useEffect(() => {
		init()
	}, []);
  return (
    <div className={styles.container}>
			<div className={styles.memoFilter}>
				<Search/>
				<div className={styles.addMemo} onClick={() => setShowAddMemo(true)}><PlusOutlined /></div>
				<TagControll isDisableEdit={true}/>
			</div>
			<div className={styles.memoContent}>
				<WaterfallLayout>
					{items.map((item, index) => <div className={styles.item} key={index}>
						<div>{item.content}</div>
						<div className={styles.infoBox}>
							<div className={styles.tagBox}>{item.tag.map((tagItem:any, index:number) => 
								<TagControll key={index} isDisableEdit={false}/>
							)}</div>
							<div className={styles.creatTime}>{item.creatTime}</div>
						</div>
					</div>)}
				</WaterfallLayout>
			</div>
			<MemoModalPage onOk={() => {}} onCancle={() => setShowAddMemo(false)} content="123" visible={showAddMemo}/>
		</div>
  );
}

export default MemoPage;