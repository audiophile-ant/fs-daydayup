import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import styles from './index.scss'
import './moudle.scss'

interface baseModalProps {
  title: string;
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
	cancelText?: string;
	okText?: string;
	children: React.ReactNode;
}
const BasicModal = (props: baseModalProps) => {
	const { title, visible, onOk, onCancel, cancelText, okText } = props;

	return (
		<Modal
			title={title}
			open={visible}
			cancelText={cancelText && "取消"}
			okText={okText && "确定"}
			onOk={onOk}
			onCancel={onCancel}
			className={styles.modal}
		>
			{props.children}
		</Modal>
	);
};

export default BasicModal;