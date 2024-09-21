// Menu.jsx
import anime from 'animejs';
import React, { useEffect, useRef,useState } from 'react';

import Item from './navigationItem';

const Menu = () => {
    const [items, setItems] = useState([]);
    const [status, setStatus] = useState('closed');
    const menuRef = useRef(null);

    const addItem = (icon, backgroundColor) => {
        setItems(prevItems => [
            ...prevItems,
            { icon, backgroundColor, ref: React.createRef() }
        ]);
    };

    const open = () => {
        setStatus('open');
        if (items.length === 0) return;

        const firstItem = items[0];
        const menuElement = menuRef.current;

        items.slice(1).forEach((item, index) => {
            anime({
                targets: item.ref.current,
                left: parseInt(firstItem.ref.current.style.left, 10) + ((index + 1) * 50),
                top: firstItem.ref.current.style.top,
                duration: 500,
            });
        });
    };

    const close = () => {
        setStatus('closed');
        if (items.length === 0) return;

        const firstItem = items[0];

        items.slice(1).forEach(item => {
            anime({
                targets: item.ref.current,
                left: firstItem.ref.current.style.left,
                top: firstItem.ref.current.style.top,
                duration: 500,
            });
        });
    };

    const handleClick = () => {
        if (status === 'closed') {
            open();
        } else {
            close();
        }
    };

    useEffect(() => {
        if (status === 'closed') {
            close();
        } else {
            open();
        }
    }, [status]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
					<div className={`menuWrapper ${status}`} onClick={handleClick}>
            <div className="hamburgerMenu">
                <span />
                <span />
                <span />
            </div>
          </div>
            {items.map((item, index) => (
                <Item
                    key={index}
                    icon={item.icon}
                    backgroundColor={item.backgroundColor}
                    ref={item.ref}
                    onMove={() => {
                        // Handle item move
                    }}
                />
            ))}
        </div>
    );
};

export default Menu;