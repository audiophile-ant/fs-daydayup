import React, { useState } from 'react';
import { Resizable } from 're-resizable';

const Demo = () => {
  const [height, setHeight] = useState(100);

  const handleResizeStop = (e: any, direction: any, ref: any, d: any) => {
    const newHeight = height + d.height;

    // 找到最近的5的倍数高度
    const nearestMultipleOf5 = Math.round(newHeight / 5) * 5;

    // 设置新的高度
    setHeight(nearestMultipleOf5);
  };

  return (
    <Resizable
      defaultSize={{
        width: '100%',
        height,
      }}
      size={{
        width: '100%',
        height,
      }}
      onResizeStop={handleResizeStop}
      enable={{
        top: false,
        right: false,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
    >
      <div style={{ background: '#ddd', height: '100%' }}>
        <p>拖动改变高度，并自动吸附到最近的5的倍数</p>
      </div>
    </Resizable>
  );
};

export default Demo;