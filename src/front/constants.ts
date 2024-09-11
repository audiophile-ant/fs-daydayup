import * as React from 'react'
import { ReactNode } from 'react'
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons'

interface SideItem {
  label: string
  key: string
  icon: ReactNode // 使用 ReactNode 类型来允许 JSX 元素或其他 React 节点
}

export const side_items: SideItem[] = [
  {
    label: 'Summary',
    key: 'summary',
    icon: <MailOutlined />,
  },
  {
    label: 'Daily Records',
    key: 'daily',
    icon: <MailOutlined />,
  },
]
