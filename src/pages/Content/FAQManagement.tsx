import React, { useState } from 'react';
import { Table, Button, Space, Typography, Tag, Modal, Form, Input, Select, InputNumber } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { initialFAQs, FAQ_CATEGORY_LABELS } from '../../models/content';
import type { FAQ, FAQCategory } from '../../models/content';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;

const FAQManagement: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [filterCategory, setFilterCategory] = useState<FAQCategory | 'ALL'>('ALL');
  const [form] = Form.useForm();

  const handleOpenModal = (faq?: FAQ) => {
    if (faq) {
      setEditingFaq(faq);
      form.setFieldsValue(faq);
    } else {
      setEditingFaq(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      const newFaq: FAQ = {
        ...values,
        id: editingFaq?.id || `F${Date.now()}`,
        createdAt: editingFaq?.createdAt || new Date().toLocaleString(),
      };

      if (editingFaq) {
        setFaqs(prev => prev.map(f => f.id === editingFaq.id ? newFaq : f));
      } else {
        setFaqs(prev => [newFaq, ...prev]);
      }
      setIsModalVisible(false);
    });
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '確定要刪除此 FAQ 嗎？',
      content: '前端頁面將立即移除此問答內容。',
      okText: '確認刪除',
      okType: 'danger',
      onOk: () => {
        setFaqs(prev => prev.filter(f => f.id !== id));
      }
    });
  };

  const filteredData = filterCategory === 'ALL' 
    ? faqs 
    : faqs.filter(f => f.category === filterCategory);

  const columns: ColumnsType<FAQ> = [
    {
      title: '權重',
      dataIndex: 'sortOrder',
      key: 'sortOrder',
      width: 80,
      sorter: (a, b) => a.sortOrder - b.sortOrder,
    },
    {
      title: '分類',
      dataIndex: 'category',
      key: 'category',
      render: (cat: FAQCategory) => <Tag color="blue">{FAQ_CATEGORY_LABELS[cat]}</Tag>,
    },
    {
      title: '問題標題',
      dataIndex: 'question',
      key: 'question',
      ellipsis: true,
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'ON_SHELF' ? 'success' : 'default'}>
          {status === 'ON_SHELF' ? '上架中' : '下架中'}
        </Tag>
      ),
    },
    {
      title: '建立時間',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} type="link" onClick={() => handleOpenModal(record)}>編輯</Button>
          <Button icon={<DeleteOutlined />} type="link" danger onClick={() => handleDelete(record.id)}>刪除</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>常見問題 (FAQ) 管理</Title>
        <Space>
           <Select 
            defaultValue="ALL" 
            style={{ width: 150 }} 
            onChange={(val) => setFilterCategory(val as any)}
            options={[
              { label: '顯示所有分類', value: 'ALL' },
              { label: '帳號問題', value: 'ACCOUNT' },
              { label: '訂單配送', value: 'ORDER' },
              { label: '退換貨政策', value: 'REFUND' },
            ]}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => handleOpenModal()}>新增問題</Button>
        </Space>
      </div>

      <Table<FAQ>
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ defaultPageSize: 10 }}
      />

      <Modal
        title={editingFaq ? '編輯問題' : '新增問題'}
        open={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
        width={700}
        okText="儲存設定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item name="category" label="問題分類" rules={[{ required: true, message: '請選擇分類' }]}>
              <Select options={[
                { label: '帳號問題', value: 'ACCOUNT' },
                { label: '訂單配送', value: 'ORDER' },
                { label: '退換貨政策', value: 'REFUND' },
              ]} />
            </Form.Item>
            <Form.Item name="sortOrder" label="排序權重 (越低越前)" initialValue={1}>
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
          </div>

          <Form.Item name="question" label="問題標題 (Question)" rules={[{ required: true, message: '請輸入問題' }]}>
            <Input placeholder="例如：我要如何申請退貨？" />
          </Form.Item>

          <Form.Item name="answer" label="問題解答 (Answer)" rules={[{ required: true, message: '請輸入答案' }]}>
            <TextArea rows={6} placeholder="支援換行與基本文字敘述..." />
          </Form.Item>

          <Form.Item name="status" label="上架狀態" initialValue="ON_SHELF">
            <Select options={[
              { label: '上架中', value: 'ON_SHELF' },
              { label: '下架中', value: 'OFF_SHELF' },
            ]} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FAQManagement;
