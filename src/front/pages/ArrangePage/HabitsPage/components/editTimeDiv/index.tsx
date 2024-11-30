import React, { useState, useEffect } from 'react';

const EditTimeDiv = ({ hours, minutes, onChange }) => {
    // 将输入的小时和分钟转换为字符串，并在前面补0
    const formatTime = (val) => val.toString().padStart(2, '0');

    // 初始状态
    const [editMode, setEditMode] = useState(null); // 'hours' | 'minutes' | null
    const [localHours, setLocalHours] = useState(formatTime(hours));
    const [localMinutes, setLocalMinutes] = useState(formatTime(minutes));

    // 处理滚轮事件
    const handleWheel = (event, type) => {
        event.preventDefault();
        const delta = Math.sign(event.deltaY);
        const change = (type === 'hours') ? (Number(delta)): (delta * 5);

        let newValue;
        if (type === 'hours') {
            newValue = parseInt(localHours, 10) + change;
            newValue = Math.max(0, Math.min(23, newValue));
            setLocalHours(formatTime(newValue));
        } else {
            newValue = parseInt(localMinutes, 10) + change;
            newValue = Math.max(0, Math.min(59, newValue));
            setLocalMinutes(formatTime(newValue));
        }
    };

    // 处理手动输入
    const handleInputChange = (event, type) => {
        const value = event.target.value;
        if (type === 'hours') {
            setLocalHours(formatTime(value));
        } else {
            setLocalMinutes(formatTime(value));
        }
    };

    // 失去焦点时更新外部状态
    const handleBlur = (type) => {
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
    const handleDoubleClick = (type) => {
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
                    onChange={(e) => handleInputChange(e, 'hours')}
                    onBlur={() => handleBlur('hours')}
                    style={{ width: '20px', textAlign: 'center' }}
                    autoFocus
                />
            ) : (
                <span
                    onDoubleClick={() => handleDoubleClick('hours')}
                    onWheel={(e) => handleWheel(e, 'hours')}
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
                    onChange={(e) => handleInputChange(e, 'minutes')}
                    onBlur={() => handleBlur('minutes')}
                    style={{ width: '20px', textAlign: 'center' }}
                    autoFocus
                />
            ) : (
                <span
                    onDoubleClick={() => handleDoubleClick('minutes')}
                    onWheel={(e) => handleWheel(e, 'minutes')}
                    style={{ cursor: 'pointer' }}
                >
                    {localMinutes}
                </span>
            )}
        </div>
    );
};

export default EditTimeDiv;