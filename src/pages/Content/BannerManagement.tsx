import React, { useState } from 'react';
import { Table, Button, Space, Typography, Tag, Modal, Form, Input, Select, Image, InputNumber, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { initialBanners } from '../../models/content';
import type { Banner, ContentStatus } from '../../models/content';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const BannerManagement: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [form] = Form.useForm();

  const handleOpenModal = (banner?: Banner) => {
    if (banner) {
      setEditingBanner(banner);
      form.setFieldsValue({
        ...banner,
        schedule: banner.startTime && banner.endTime ? [dayjs(banner.startTime), dayjs(banner.endTime)] : undefined,
      });
    } else {
      setEditingBanner(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      const schedule = values.schedule;
      const newBanner: Banner = {
        ...values,
        id: editingBanner?.id || `B${Date.now()}`,
        startTime: schedule ? schedule[0].format('YYYY-MM-DD HH:mm') : undefined,
        endTime: schedule ? schedule[1].format('YYYY-MM-DD HH:mm') : undefined,
      };

      if (editingBanner) {
        setBanners(prev => prev.map(b => b.id === editingBanner.id ? newBanner : b));
      } else {
        setBanners(prev => [...prev, newBanner]);
      }
      setIsModalVisible(false);
    });
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '確定要刪除此 Banner 嗎？',
      content: '刪除後前台將不再顯示此內容。',
      okText: '確認刪除',
      okType: 'danger',
      onOk: () => {
        setBanners(prev => prev.filter(b => b.id !== id));
      }
    });
  };

  const getStatusTag = (status: ContentStatus) => {
    switch (status) {
      case 'ON_SHELF':
        return <Tag color="success">上架中</Tag>;
      case 'OFF_SHELF':
        return <Tag color="default">已下架</Tag>;
      case 'SCHEDULED':
        return <Tag color="processing">排程中</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const columns: ColumnsType<Banner> = [
    {
      title: '排序',
      dataIndex: 'sortOrder',
      key: 'sortOrder',
      width: 80,
    },
    {
      title: 'Banner 標題',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '預覽圖 (網頁/手機)',
      key: 'preview',
      width: 200,
      render: (_, record) => (
        <Space>
          <Image src={record.desktopImage} width={60} height={30} style={{ objectFit: 'cover' }} />
          <Image src={record.mobileImage} width={30} height={40} style={{ objectFit: 'cover' }} />
        </Space>
      ),
    },
    {
      title: '連結網址',
      dataIndex: 'targetUrl',
      key: 'targetUrl',
      ellipsis: true,
      render: (url) => <Text type="secondary">{url}</Text>
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      render: (status: ContentStatus) => getStatusTag(status),
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
        <Title level={3} style={{ margin: 0 }}>Banner 管理</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => handleOpenModal()}>新增 Banner</Button>
      </div>

      <Table<Banner>
        columns={columns}
        dataSource={banners}
        rowKey="id"
        pagination={{ defaultPageSize: 10 }}
      />

      <Modal
        title={editingBanner ? '編輯 Banner' : '新增 Banner'}
        open={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
        width={700}
        okText="儲存設定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Banner 標題" rules={[{ required: true, message: '請輸入標題' }]}>
            <Input placeholder="內部管理識別用 (如：2025春季滿額免運)" />
          </Form.Item>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item name="desktopImage" label="網頁版圖片 (1920x800)" rules={[{ required: true, message: '請輸入圖片網址' }]}>
              <Input placeholder="https://..." />
            </Form.Item>
            <Form.Item name="mobileImage" label="手機版圖片 (800x1000)" rules={[{ required: true, message: '請輸入圖片網址' }]}>
              <Input placeholder="https://..." />
            </Form.Item>
          </div>

          <Form.Item name="targetUrl" label="目標連結 (URL)" rules={[{ required: true, message: '請輸入跳轉網址' }]}>
            <Input placeholder="/collection/..." />
          </Form.Item>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <Form.Item name="sortOrder" label="排序權重" initialValue={1}>
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="status" label="顯示狀態" initialValue="ON_SHELF">
              <Select options={[
                { label: '上架中', value: 'ON_SHELF' },
                { label: '下架中', value: 'OFF_SHELF' },
                { label: '排程中', value: 'SCHEDULED' },
              ]} />
            </Form.Item>
          </div>

          <Form.Item name="schedule" label="排程日期時間 (選填)">
            <RangePicker showTime style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BannerManagement;
