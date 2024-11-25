import React, { useEffect, useState } from 'react';
import { Tag, Input, ConfigProvider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import styles from './index.scss';

interface TagControllProps {
	isDisableEdit: boolean
}

const TagControll = ({isDisableEdit}: TagControllProps) => {
	const [tags, setTags] = useState<any[]>([])
	const [inputVisible, setInputVisible] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [currentIndex, setCurrentIndex] = useState(null)

	const init = () => {
		setTags([
			{name: '标签1'},
			{name: '标签2'},
			{name: '标签3'},
		])
	}
	const handleInputConfirm = () => {
		console.log(`提交新增标签信息${inputValue}`);
		setInputValue('')
		setInputVisible(false)
		init()
	}

	const handleEditConfirm = () => {
		let oldTags = tags
		oldTags[currentIndex].name = inputValue
		setTags(oldTags)
		setInputValue('')
		setCurrentIndex(null)
	}

	const handleSelectTag = (index: number) => {
		setCurrentIndex(index)
		setInputValue(tags[index].name)
	}

	useEffect(() => {
		init()
	}, [])

  return (
    <div className={styles.container} >
			<ConfigProvider
  		  theme={{
  		    token: {
  		      // Seed Token，影响范围大
  		      colorPrimary: '#00b96b',					
  		      // 派生变量，影响范围小
  		      colorBgContainer: '#f6ffed',
  		    },
  		  }}
  		 >			
				{tags.map((tag, index) => (
				    <div key={index} style={{ marginBottom: 5}}>
				        {currentIndex === index && !isDisableEdit ? (
				            <Input
										type="text"
										size="small"
										style={{ width: 71, marginRight: 8, height: 28 }}
										autoFocus
										value={inputValue}
										onChange={(e) => setInputValue(e.target.value)}
										onBlur={handleEditConfirm}
										onPressEnter={handleEditConfirm}
									/>
				        ) : (
				            <Tag
				                key={index}
				                onClick={() => handleSelectTag(index)}
				                className={classNames([styles.tag, { [styles.isActive]: currentIndex === index }])}
				            >
				                {tag.name}
				            </Tag>
				        )}
				    </div>
				))}
				{inputVisible ? (
      	  <Input
      	    type="text"
      	    size="small"
						style={{ width: 71, marginRight: 8, height: 28, marginBottom: 5 }}
						autoFocus
      	    value={inputValue}
      	    onChange={(e) => setInputValue(e.target.value)}
      	    onBlur={handleInputConfirm}
      	    onPressEnter={handleInputConfirm}
      	  />
      	) : (
      	  <Tag icon={<PlusOutlined />} className={styles.tag} onClick={() => setInputVisible(true)} style={{marginBottom: 5}}>
      	    新标签
      	  </Tag>
      	)}
			</ConfigProvider>
				
		</div>
  );
}

export default TagControll;