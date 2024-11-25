import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const SortableList = () => {
    const [items, setItems] = useState([
        { id: 1, text: 'Item 1' },
        { id: 2, text: 'Item 2' },
        { id: 3, text: 'Item 3' },
        { id: 4, text: 'Item 4' },
        { id: 5, text: 'Item 5' },
    ]);

    const listRef = useRef(null);
    const draggableRefs = useRef([]);
    draggableRefs.current = [];

    useEffect(() => {
        draggableRefs.current.forEach((itemRef, index) => {
            Draggable.create(itemRef, {
                type: 'y',
                edgeResistance: 0.65,
                bounds: listRef.current,
                onDragEnd: () => handleDragEnd(index),
            });
        });
    }, []);

    const addToRefs = (el) => {
        if (el && !draggableRefs.current.includes(el)) {
            draggableRefs.current.push(el);
        }
    };

    const handleDragEnd = (draggedIndex) => {
        const draggedElement = draggableRefs.current[draggedIndex];
        const newItems = [...items];

        const draggedItem = newItems.splice(draggedIndex, 1)[0];
        newItems.forEach((item, index) => {
            const itemElement = draggableRefs.current[index];
            if (itemElement.offsetTop > draggedElement.offsetTop) {
                newItems.splice(index, 0, draggedItem);
            }
        });

        if (!newItems.includes(draggedItem)) {
            newItems.push(draggedItem);
        }

        setItems(newItems);
    };

    return (
        <div ref={listRef} style={{ position: 'relative', height: '300px', border: '1px solid #ccc' }}>
            {items.map((item, index) => (
                <div
                    key={item.id}
                    ref={addToRefs}
                    style={{
                        position: 'absolute',
                        top: `${index * 50}px`,
                        width: '100%',
                        height: '50px',
                        background: '#f0f0f0',
                        border: '1px solid #aaa',
                        cursor: 'grab',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {item.text}
                </div>
            ))}
        </div>
    );
};

export default SortableList;