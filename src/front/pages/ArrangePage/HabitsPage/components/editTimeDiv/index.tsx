import React, { useState, useEffect } from 'react';
import _ from 'lodash'

interface EditTimeDivProps {
	hours: number
	minutes: number
	onChange: (hours: number, minutes: number) => void
}

const EditTimeDiv = ({ hours, minutes, onChange }: EditTimeDivProps) => {
    // 补0
    const formatTime = (val: number) => val.toString().padStart(2, '0');

    const [editMode, setEditMode] = useState(null); // 'hours' | 'minutes' | null
    const [localHours, setLocalHours] = useState(formatTime(hours));
    const [localMinutes, setLocalMinutes] = useState(formatTime(minutes));

    // 处理手动输入
		const handleSimpleChange = (event: any, type: 'hours' | 'minutes') => {
			const value = event.target.value;
			if (type === 'hours') {
					setLocalHours(value);
			} else {
					setLocalMinutes(value);
			}
		};
		
    // 失去焦点时更新外部状态
    const handleBlur = (type: 'hours' | 'minutes') => {
        if (type === 'hours') {
            const newValue = parseInt(localHours, 10);
            if (!isNaN(newValue) && newValue >= 0 && newValue <= 23) {
                onChange(newValue, parseInt(localMinutes, 10));
            } else {
                setLocalHours(formatTime(hours));
            }
        } else {
            const newValue = parseInt(localMinutes, 10);
            if (!isNaN(newValue) && newValue >= 0 && newValue <= 59) {
                onChange(parseInt(localHours, 10), newValue);
            } else {
                setLocalMinutes(formatTime(minutes));
            }
        }
        setEditMode(null);
    };

    // 处理双击事件
    const handleDoubleClick = (type: 'hours' | 'minutes') => {
        setEditMode(type);
    };

    useEffect(() => {
        setLocalHours(formatTime(hours));
        setLocalMinutes(formatTime(minutes));
    }, [hours, minutes]);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {editMode === 'hours' ? (
                <input
                    type="text"
                    value={localHours}
                    onChange={(e) => handleSimpleChange(e, 'hours')}
                    onBlur={() => handleBlur('hours')}
                    style={{ width: '20px', textAlign: 'center' }}
                    autoFocus
                />
            ) : (
                <span
                    onDoubleClick={() => handleDoubleClick('hours')}
                    style={{ cursor: 'pointer' }}
                >
                    {localHours}
                </span>
            )}
            :
            {editMode === 'minutes' ? (
                <input
                    type="text"
                    value={localMinutes}
                    onChange={(e) => handleSimpleChange(e, 'minutes')}
                    onBlur={() => handleBlur('minutes')}
                    style={{ width: '20px', textAlign: 'center' }}
                    autoFocus
                />
            ) : (
                <span
                    onDoubleClick={() => handleDoubleClick('minutes')}
                    style={{ cursor: 'pointer' }}
                >
                    {localMinutes}
                </span>
            )}
        </div>
    );
};

export default EditTimeDiv;