import React, { useEffect, useState, useRef } from 'react';
import BasicModal from '@/front/components/baseModal';
import { Form, Input } from 'antd';

interface todoModalPageProps {
	onOk: () => void;
	onCancle: () => void;
	visible: boolean;
	id?: string;
	content?: string;
	father: number | null;
}

interface FieldType {
	content: string;
  remark?: string;
  priority?: string;
  reward?: string;
	deadline?: string;
	status: string;
}
const TodoModalPage = ({onOk, onCancle, id, visible, content, father}: todoModalPageProps) => {
	const [form] = Form.useForm();
	const [isEdit, setIsEdit] = useState(false);

	useEffect(() => {
		return () => {
			form.resetFields();
		};
	}, [form]);

	useEffect(() => {
		console.log(123, content, father)
		if(id){
			setIsEdit(true);
		}else {
			form.setFieldsValue({
				content: content || '',
				remark: '',
				priority: '',
				reward: '',
				deadline: '',
				status: ''		
			});
		}
	}, [id, content, visible])
  return (
    <BasicModal
			onOk={onOk}
			onCancel={onCancle}
			title="新建待办"
			visible={visible}
		>
			<Form
				form={form}
				name="basic"
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 20 }}
				style={{ maxWidth: 500 }}
			>
				<Form.Item<FieldType>
    		  label="内容"
    		  name="content"
					rules={[{ required: true, message: '请输入内容!' }]}
    		>
    		  <Input />
    		</Form.Item>
				<Form.Item<FieldType>
    		  label="备注"
    		  name="remark"
    		>
    		  <Input />
    		</Form.Item>
				<Form.Item<FieldType>
    		  label="优先级"
    		  name="priority"
    		>
    		  <Input />
    		</Form.Item>
				<Form.Item<FieldType>
    		  label="奖励"
    		  name="reward"
    		>
    		  <Input />
    		</Form.Item>
				<Form.Item<FieldType>
    		  label="截止时间"
    		  name="deadline"
    		>
    		  <Input />
    		</Form.Item>
				<Form.Item<FieldType>
    		  label="状态"
    		  name="status"
    		>
    		  <Input />
    		</Form.Item>
			</Form>
		</BasicModal>
  );
}

export default TodoModalPage;