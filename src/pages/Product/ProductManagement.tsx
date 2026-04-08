import React, { useState } from 'react';
import { Table, Typography, Tag, Button, Space, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { initialProducts } from '../../models/product';
import type { Product } from '../../models/product';

const { Title } = Typography;

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const handleForceTakedown = (record: Product) => {
    Modal.confirm({
      title: '確定要強制下架此商品嗎？',
      content: `商品名稱：${record.name}。下架後前端市集將立即隱藏此商品。`,
      okText: '確認下架',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        setProducts(prev => 
          prev.map(p => p.id === record.id ? { ...p, status: 'OFF_SHELF' } : p)
        );
      }
    });
  };

  const columns: ColumnsType<Product> = [
    {
      title: '商品名稱',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '商品類型',
      dataIndex: 'origin',
      key: 'origin',
      render: (origin: string) => {
        if (origin === 'BASE_BODY') {
          return <Tag color="blue">素體</Tag>;
        }
        return <Tag color="purple">一般商品</Tag>;
      }
    },
    {
      title: '分類',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '售價',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `NT$ ${price.toLocaleString()}`
    },
    {
      title: '藝術家',
      dataIndex: 'artist',
      key: 'artist',
      render: (artist: string | null) => artist || '-'
    },
    {
      title: '製造商',
      dataIndex: 'manufacturer',
      key: 'manufacturer',
    },
    {
      title: '交期',
      dataIndex: 'leadTime',
      key: 'leadTime',
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        if (status === 'ON_SHELF') {
          return (
            <Space>
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#52c41a' }} />
              上架中
            </Space>
          );
        }
        return (
          <Space>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#d9d9d9' }} />
            下架中
          </Space>
        );
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => {
        if (record.status === 'ON_SHELF') {
          return (
            <Button type="link" danger onClick={() => handleForceTakedown(record)} style={{ padding: 0 }}>
              強制下架
            </Button>
          );
        }
        return null;
      }
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>商品管理</Title>
      </div>
      
      <Table<Product>
        columns={columns}
        dataSource={products}
        rowKey="id"
        pagination={{
          showSizeChanger: false,
          showQuickJumper: false,
          showTotal: undefined, // 移除總數顯示
          defaultPageSize: 10,
          position: ['bottomRight']
        }}
      />
    </div>
  );
};

export default ProductManagement;
