import React from 'react';

import {
  ContainerOutlined,
  ProjectOutlined,
  DollarOutlined,
  CalendarOutlined,
  UngroupOutlined,
} from '@ant-design/icons';

export const operationList = [
  { name: '备注', icon: <ContainerOutlined /> },
  { name: '优先级', icon: <ProjectOutlined /> },
  { name: '奖励', icon: <DollarOutlined /> },
  { name: '截止时间', icon: <CalendarOutlined /> },
  { name: '状态', icon: <UngroupOutlined /> },
];
