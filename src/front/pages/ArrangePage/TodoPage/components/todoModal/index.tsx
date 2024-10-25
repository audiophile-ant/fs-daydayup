import React, { useEffect, useState, useRef } from 'react';
import BasicModal from '@/front/components/baseModal';
import { Form, Input, Radio, DatePicker, ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';

dayjs.locale('zh-cn');

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
  remark: string;
  priority: number;
  reward: number;
	deadline: Date;
	status: number;
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
				priority: 0,
				reward: 0,
				deadline: null,
				status: 0		
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
    		  <Radio.Group>
    			  <Radio value={0}>低</Radio>
    			  <Radio value={1}>中</Radio>
    			  <Radio value={2}>高</Radio>
    			  <Radio value={3}>极高</Radio>
    			</Radio.Group>
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
					<ConfigProvider locale={zhCN}>
						<DatePicker popupClassName="deadline" open/>
					</ConfigProvider>	
    		</Form.Item>
				<Form.Item<FieldType>
    		  label="状态"
    		  name="status"
    		>
    		  <Radio.Group>
    			  <Radio value={0}>未进行</Radio>
    			  <Radio value={1}>进行中</Radio>
    			  <Radio value={2}>已完成</Radio>
    			  <Radio value={3}>阻塞中</Radio>
    			</Radio.Group>
    		</Form.Item>
			</Form>
		</BasicModal>
  );
}

export default TodoModalPage;