// Menu.jsx
import anime from 'animejs';
import React, { useEffect, useRef,useState } from 'react';

import Item from './navigationItem';

interface menuProps {
    icon: string;
		backgroundColor: string;
}

interface MenuProps {
	items: menuProps[];
}

const Menu: React.FC<MenuProps> = ({items}) => {
    const [isOpen, setIsOpen] = useState(false);
    const childRefs  = useRef([]);

    const open = () => {
        setIsOpen(true);
        if (childRefs.current.length === 0) return;

        const firstItem = childRefs.current[0];
        const sens = firstItem.getBoundingClientRect().left < firstItem.getBoundingClientRect().right ? 1 : -1;
				let current = 1;

        while(childRefs.current[current] !== null){
					anime({
						targets: childRefs.current[current],
						left: parseInt(firstItem.getBoundingClientRect().left, 10) + (sens * (current * 50)),
						top: firstItem.getBoundingClientRect().top,
						duration: 500
					});
					current++
				}
    };

    const close = () => {
				setIsOpen(false);
        if (childRefs.current.length === 0) return;

        const firstItem = childRefs.current[0];
				let current = 1;

        while(childRefs.current[current] !== null){
					anime({
						targets: childRefs.current[current],
						left: firstItem.getBoundingClientRect().left,
						top: firstItem.getBoundingClientRect().top,
						duration: 500
					});
					current++
				}
    };

    const handleClick = () => {
        if (isOpen === false) {
            open();
        } else {
            close();
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {items.map((item: any, index: number) => (
                <Item
                    key={index}
                    icon={item.icon}
                    backgroundColor={item.backgroundColor}
                    ref={(el: any) => {childRefs.current[index] = el}}
										preRef={index !== 0 ? childRefs.current[index - 1] : undefined}
										nextRef={index !== items.length - 1 ? childRefs.current[index + 1] : undefined}
										click={handleClick}
										close={close}
                />
            ))}
        </div>
    );
};

export default Menu;