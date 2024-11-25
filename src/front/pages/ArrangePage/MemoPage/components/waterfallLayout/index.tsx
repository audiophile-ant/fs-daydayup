import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface ItemStyle extends React.CSSProperties {
  height: number;
}

interface WaterfallLayoutProps {
  children: ReactNode;
}

const WaterfallLayout: React.FC<WaterfallLayoutProps> = ({ children }) => {
	const itemRefs = useRef([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState<number>(0);
  const [childStyles, setChildStyles] = useState<ItemStyle[]>([]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (itemWidth > 0) {
        setTimeout(() => {
					const updatedHeights = Array(3).fill(0);
        	const updatedChildStyles: any = React.Children.map(children, (child, index) => {
        	    const childStyle: any = (child as React.ReactElement<{ style?: ItemStyle }>).props.style || {};
					
        	    // 获取延迟后的 clientHeight
        	    const clientHeight = itemRefs.current[index].clientHeight || 0;

        	    // 找到高度最小的那一列
        	    const minHeight = Math.min(...updatedHeights);
        	    const columnIndex = updatedHeights.indexOf(minHeight);

        	    // 更新该列的高度
        	    updatedHeights[columnIndex] += clientHeight + 10;
        	    const left = columnIndex * itemWidth;

        	    return {
        	        ...childStyle,
        	        position: 'absolute',
        	        top: `${updatedHeights[columnIndex] - clientHeight}px`,
        	        left: `${left}px`,
        	        width: `${itemWidth - 10}px`,
        	        visibility: 'visible', // 恢复元素可见性
        	    };
        	});

        	setChildStyles(updatedChildStyles);
				}, 100)
    }
}, [itemWidth, children]);

  const handleResize = () => {
    const container = containerRef.current;
    if (container) {
      const containerWidth = container.offsetWidth;
      const itemWidth = containerWidth / 3;
      setItemWidth(itemWidth);
    }
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      {React.Children.map(children, (child, index) => (
        <div style={childStyles[index] || {}} ref={(el) => (itemRefs.current[index] = el)}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default WaterfallLayout;