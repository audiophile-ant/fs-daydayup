import React, { useState } from 'react';
import _ from 'lodash'
import styles from './index.scss'

interface EditableDivProps {
	initialContent: string
	synchronizedContent: (value: string) => void
}
const EditableDiv = ({ initialContent, synchronizedContent }: EditableDivProps) => {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    // setIsEditing(false);
		synchronizedContent(content)
  };

  const handleChange = (event: any) => {
    setContent(event.target.value);
  };

  return (
    <div>
      {isEditing ? (
        <textarea
					className={styles.editInput}
          value={content}
          onBlur={handleBlur}
          onChange={handleChange}
          autoFocus
        />
      ) : (
        <div onClick={handleClick}>
          {content}
        </div>
      )}
    </div>
  );
};

export default EditableDiv;