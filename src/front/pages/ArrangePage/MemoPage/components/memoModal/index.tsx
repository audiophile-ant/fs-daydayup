import React, { useEffect, useState, useRef } from 'react';
import { Form, Input, Select } from 'antd';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';

import BasicModal from '@/front/components/baseModal';

dayjs.locale('zh-cn');

interface memoModalPageProps {
	onOk: () => void;
	onCancel: () => void;
	visible: boolean;
	id?: string;
	content?: string;
}

interface FieldType {
	content: string;
  tag: string;
}    

const MemoModalPage = ({ onOk, onCancel, visible, content }: memoModalPageProps) => {
  const [form] = Form.useForm();
  const [memoContent, setMemoContent] = useState(content || '');    
  const [options, setOptions] = useState([]);

  const handleChange = (value: string) => {
    console.log('-----tag------', value);
  };

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [form]);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        content: content || '',
        tag: ''
      });
      setMemoContent(content || '');
    }
  }, [visible, content]);

  return (
    <BasicModal
      onOk={onOk}
      onCancel={onCancel}
      title="新建备忘"
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
          <Input value={memoContent} onChange={(e) => setMemoContent(e.target.value)} />
        </Form.Item>
        <Form.Item<FieldType>
          label="标签"
          name="tag"
        >
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Tags Mode"
            onChange={handleChange}
            options={options}
          />
        </Form.Item>
      </Form>
    </BasicModal>
  );
};

export default MemoModalPage;