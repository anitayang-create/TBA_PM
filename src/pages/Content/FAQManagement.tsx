import React, { useState } from 'react';
import {
  Table, Button, Space, Typography, Tag, Modal, Form, Input,
  Select, InputNumber, Tabs, Collapse, Alert
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { CollapseProps } from 'antd';
import { initialFAQs, FAQ_CATEGORY_LABELS } from '../../models/content';
import type { FAQ, FAQCategory } from '../../models/content';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

// ── 前台預覽：Accordion 手風琴元件 ───────────────────────────────────
const FrontendPreview: React.FC<{ faqs: FAQ[] }> = ({ faqs }) => {
  const memberFaqs = faqs
    .filter(f => f.category === 'Member' && f.status === 'ON_SHELF')
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const artistFaqs = faqs
    .filter(f => f.category === 'Artist' && f.status === 'ON_SHELF')
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const buildCollapseItems = (list: FAQ[]): CollapseProps['items'] =>
    list.map((faq, index) => ({
      key: faq.id,
      label: (
        <span style={{ fontWeight: 500 }}>
          Q{index + 1}. {faq.question}
        </span>
      ),
      children: (
        <div
          style={{ lineHeight: 1.8, color: '#4a4a4a', padding: '4px 0' }}
          dangerouslySetInnerHTML={{ __html: faq.answer }}
        />
      ),
    }));

  const tabItems = [
    {
      key: 'Member',
      label: '一般會員常見問題',
      children: memberFaqs.length > 0 ? (
        <Collapse
          accordion
          items={buildCollapseItems(memberFaqs)}
          style={{ background: '#fafafa' }}
        />
      ) : (
        <Alert message="目前沒有上架的一般會員問題" type="info" showIcon />
      ),
    },
    {
      key: 'Artist',
      label: '藝術家會員常見問題',
      children: artistFaqs.length > 0 ? (
        <Collapse
          accordion
          items={buildCollapseItems(artistFaqs)}
          style={{ background: '#fafafa' }}
        />
      ) : (
        <Alert message="目前沒有上架的藝術家問題" type="info" showIcon />
      ),
    },
  ];

  return (
    <div>
      <Alert
        style={{ marginBottom: 16 }}
        message="前台預覽模式"
        description="以下為前台頁面的模擬呈現，僅顯示「上架中」的問題。點擊問題標題可展開/收合解答。"
        type="warning"
        showIcon
      />
      <Tabs defaultActiveKey="Member" items={tabItems} />
    </div>
  );
};

// ── 主元件 ───────────────────────────────────────────────────────────
const FAQManagement: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [filterCategory, setFilterCategory] = useState<FAQCategory | 'ALL'>('ALL');
  const [answerPreviewHtml, setAnswerPreviewHtml] = useState('');
  const [form] = Form.useForm();

  const handleOpenModal = (faq?: FAQ) => {
    if (faq) {
      setEditingFaq(faq);
      form.setFieldsValue(faq);
      setAnswerPreviewHtml(faq.answer);
    } else {
      setEditingFaq(null);
      form.resetFields();
      setAnswerPreviewHtml('');
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
      width: 70,
      sorter: (a, b) => a.sortOrder - b.sortOrder,
    },
    {
      title: '身分類別',
      dataIndex: 'category',
      key: 'category',
      render: (cat: FAQCategory) => (
        <Tag color={cat === 'Member' ? 'blue' : 'purple'}>
          {FAQ_CATEGORY_LABELS[cat]}
        </Tag>
      ),
    },
    {
      title: '問題標題',
      dataIndex: 'question',
      key: 'question',
      ellipsis: true,
    },
    {
      title: '解答預覽',
      dataIndex: 'answer',
      key: 'answer',
      ellipsis: true,
      render: (html: string) => (
        <Text type="secondary" style={{ fontSize: 12 }}>
          {html.replace(/<[^>]*>/g, '').slice(0, 50)}…
        </Text>
      ),
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      width: 90,
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
      width: 160,
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
      {/* ── 頁面標題列 ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>常見問題 (FAQ) 管理</Title>
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => setIsPreviewVisible(true)}
          >
            前台預覽
          </Button>
          <Select
            defaultValue="ALL"
            style={{ width: 160 }}
            onChange={(val) => setFilterCategory(val as FAQCategory | 'ALL')}
            options={[
              { label: '顯示所有類別', value: 'ALL' },
              { label: '一般會員', value: 'Member' },
              { label: '藝術家會員', value: 'Artist' },
            ]}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => handleOpenModal()}>新增問題</Button>
        </Space>
      </div>

      {/* ── 資料表格 ── */}
      <Table<FAQ>
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ defaultPageSize: 10 }}
      />

      {/* ── 新增 / 編輯 Modal ── */}
      <Modal
        title={editingFaq ? '編輯問題' : '新增問題'}
        open={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
        width={780}
        okText="儲存設定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <Form.Item name="category" label="身分類別" rules={[{ required: true, message: '請選擇類別' }]}>
              <Select options={[
                { label: '一般會員', value: 'Member' },
                { label: '藝術家會員', value: 'Artist' },
              ]} />
            </Form.Item>
            <Form.Item name="sortOrder" label="排序權重 (越低越前)" initialValue={1}>
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="status" label="上架狀態" initialValue="ON_SHELF">
              <Select options={[
                { label: '上架中', value: 'ON_SHELF' },
                { label: '下架中', value: 'OFF_SHELF' },
              ]} />
            </Form.Item>
          </div>

          <Form.Item name="question" label="問題標題 (Question)" rules={[{ required: true, message: '請輸入問題' }]}>
            <Input placeholder="例如：我要如何申請退貨？" />
          </Form.Item>

          <Form.Item
            name="answer"
            label={
              <span>
                問題解答 (Answer)
                <Text type="secondary" style={{ fontSize: 12, marginLeft: 8 }}>
                  支援 HTML 標籤，如 &lt;b&gt;粗體&lt;/b&gt;、&lt;a href="..."&gt;連結&lt;/a&gt;、&lt;br/&gt; 換行、＊ 等
                </Text>
              </span>
            }
            rules={[{ required: true, message: '請輸入答案' }]}
          >
            <TextArea
              rows={5}
              placeholder={'例如：請至 <a href="https://www.tba.tw">www.tba.tw</a> 聯繫客服，我們將在 <b>3 個工作天</b>內回覆。'}
              onChange={(e) => setAnswerPreviewHtml(e.target.value)}
            />
          </Form.Item>

          {/* HTML 即時預覽區 */}
          {answerPreviewHtml && (
            <div style={{
              border: '1px solid #d9d9d9',
              borderRadius: 6,
              padding: '12px 16px',
              background: '#fafafa',
              marginBottom: 16,
            }}>
              <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 6 }}>
                ▶ 前台渲染預覽
              </Text>
              <div
                style={{ lineHeight: 1.8, color: '#333' }}
                dangerouslySetInnerHTML={{ __html: answerPreviewHtml }}
              />
            </div>
          )}
        </Form>
      </Modal>

      {/* ── 前台 Accordion 預覽 Modal ── */}
      <Modal
        title="前台頁面預覽 — 常見問題"
        open={isPreviewVisible}
        onCancel={() => setIsPreviewVisible(false)}
        footer={<Button onClick={() => setIsPreviewVisible(false)}>關閉</Button>}
        width={800}
      >
        <FrontendPreview faqs={faqs} />
      </Modal>
    </div>
  );
};

export default FAQManagement;
