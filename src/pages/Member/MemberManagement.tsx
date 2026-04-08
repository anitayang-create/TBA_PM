import React, { useState } from 'react';
import { Table, Typography, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { initialMembers } from '../../models/member';
import type { Member } from '../../models/member';

const { Title } = Typography;

const MemberManagement: React.FC = () => {
  const [members] = useState<Member[]>(initialMembers);

  const columns: ColumnsType<Member> = [
    {
      title: '會員編號',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '註冊 Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '會員名稱',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '身分標籤',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        if (role === 'ARTIST') {
          return <Tag color="geekblue">藝術家</Tag>;
        }
        return <Tag color="default">一般會員</Tag>;
      }
    },
    {
      title: '註冊時間',
      dataIndex: 'registeredAt',
      key: 'registeredAt',
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>會員管理</Title>
      </div>
      
      <Table<Member>
        columns={columns}
        dataSource={members}
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

export default MemberManagement;
