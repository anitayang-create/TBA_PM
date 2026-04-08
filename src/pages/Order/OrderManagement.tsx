import React, { useState } from 'react';
import { Table, Typography, Tag, Button, Space, Modal, Empty, Avatar, List } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { initialOrders } from '../../models/order';
import type { Order, OrderStatus } from '../../models/order';

const { Title, Text } = Typography;

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleCancelOrder = (order: Order) => {
    Modal.confirm({
      title: '確定要取消此訂單嗎？',
      content: (
        <div>
          <p>訂單編號：{order.id}</p>
          <Text type="danger">※ 此動作將同步觸發 TapPay 退刷流程，狀態一旦變更為「已取消」將無法恢復。</Text>
        </div>
      ),
      okText: '確認取消並退款',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        setOrders(prev => 
          prev.map(o => o.id === order.id ? { ...o, status: 'CANCELLED' } : o)
        );
      }
    });
  };

  const getStatusTag = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return <Tag color="warning">待處理</Tag>;
      case 'PROCESSING':
        return <Tag color="blue">處理中</Tag>;
      case 'SHIPPED':
        return <Tag color="success">已出貨</Tag>;
      case 'CANCELLED':
        return <Tag color="error">已取消</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const expandedRowRender = (record: Order) => {
    const shippingData = [
      { label: '收件人姓名', value: record.shippingInfo.recipient },
      { label: '聯絡電話', value: record.shippingInfo.phone },
      { label: '送貨地址', value: record.shippingInfo.address },
    ];

    const paymentData = [
      { label: '發票方式', value: record.paymentInfo.invoiceMethod },
      { label: '支付方式', value: record.paymentInfo.paymentMethod },
      { label: '物流追蹤', value: record.trackingNumber || '尚未填寫' },
    ];

    const infoColumns = [
      { title: '項目', dataIndex: 'label', key: 'label', width: 150, className: 'info-label-cell' },
      { title: '內容', dataIndex: 'value', key: 'value' },
    ];

    return (
      <div style={{ padding: '24px', background: '#fdfdfd', border: '1px solid #f0f0f0', borderRadius: '8px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={5} style={{ marginBottom: 16 }}>基本資訊核對</Title>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <Table
                dataSource={shippingData}
                columns={infoColumns}
                pagination={false}
                size="small"
                bordered
                showHeader={false}
                rowKey="label"
                style={{ background: '#fff' }}
              />
              <Table
                dataSource={paymentData}
                columns={infoColumns}
                pagination={false}
                size="small"
                bordered
                showHeader={false}
                rowKey="label"
                style={{ background: '#fff' }}
              />
            </div>
          </div>

          <div>
            <Title level={5} style={{ marginBottom: 16 }}>訂購資訊 (商品明細)</Title>
            <List
              itemLayout="horizontal"
              dataSource={record.items}
              header={<div style={{ fontWeight: 'bold', padding: '0 16px' }}>商品內容列表</div>}
              bordered
              style={{ background: '#fff' }}
              renderItem={(item) => (
                <List.Item style={{ padding: '16px 24px' }}>
                  <List.Item.Meta
                    avatar={<Avatar shape="square" size={64} src={item.image} style={{ border: '1px solid #f0f0f0' }} />}
                    title={<Text strong>{item.name}</Text>}
                    description={
                      <Space direction="vertical" size={0}>
                        <Text type="secondary">規格：{item.specification}</Text>
                        <Text type="secondary">對應藝術家：{item.artist}</Text>
                      </Space>
                    }
                  />
                  <div style={{ textAlign: 'right' }}>
                    <Text>NT$ {item.price.toLocaleString()} x {item.quantity}</Text>
                    <br />
                    <Text strong style={{ fontSize: '16px' }}>小計：NT$ {(item.price * item.quantity).toLocaleString()}</Text>
                  </div>
                </List.Item>
              )}
            />
          </div>

          {(record.status === 'PENDING' || record.status === 'PROCESSING') && (
            <div style={{ textAlign: 'right', marginTop: 8 }}>
              <Button danger type="primary" onClick={() => handleCancelOrder(record)}>
                強制取消訂單並執行 TapPay 退款
              </Button>
            </div>
          )}
        </Space>
      </div>
    );
  };

  const columns: ColumnsType<Order> = [
    {
      title: '訂單日期',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      defaultSortOrder: 'ascend',
    },
    {
      title: '訂單編號',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '訂單狀態',
      dataIndex: 'status',
      key: 'status',
      render: (status: OrderStatus) => getStatusTag(status),
    },
    {
      title: '買家名稱',
      dataIndex: 'buyerName',
      key: 'buyerName',
    },
    {
      title: '訂單總計',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => `NT$ ${amount.toLocaleString()}`,
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>訂單管理</Title>
      </div>

      {orders.length === 0 ? (
        <Empty description="目前沒有任何訂單喔！" />
      ) : (
        <Table<Order>
          columns={columns}
          dataSource={orders}
          pagination={{
            showSizeChanger: false,
            showQuickJumper: false,
            showTotal: undefined,
            defaultPageSize: 10,
            position: ['bottomRight']
          }}
          expandable={{
            expandedRowRender,
            expandRowByClick: false,
          }}
        />
      )}
    </div>
  );
};

export default OrderManagement;
