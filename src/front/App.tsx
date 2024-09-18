import React from 'react';
import { Button, Flex } from 'antd';
import { createRoot } from 'react-dom/client';

const App: React.FC = () => (
  <Flex gap="middle" wrap>
    <Button type="primary" autoInsertSpace={false}>
      确定
    </Button>
    <Button type="primary" autoInsertSpace>
      确定123
    </Button>
  </Flex>
);

const root = createRoot(document.getElementById('root'));
root.render(<App />);