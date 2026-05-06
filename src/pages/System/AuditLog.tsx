import React from 'react';
import { Card, Table, Typography, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { AuditLog } from '../../models/system';

const { Title } = Typography;

const mockAuditLogs: AuditLog[] = [
  {
    id: 'LOG-001',
    actionTime: '2026-04-30 16:45:12',
    operator: 'admin_sys',
    module: '使用者管理',
    action: '新增使用者 (CREATE_USER)',
    target: 'UID-10023',
  },
  {
    id: 'LOG-002',
    actionTime: '2026-04-30 15:30:00',
    operator: 'admin_sys',
    module: '使用者管理',
    action: '停用帳號 (DISABLE_USER)',
    target: 'UID-10015',
  },
  {
    id: 'LOG-003',
    actionTime: '2026-04-30 14:22:45',
    operator: 'admin_hr',
    module: '角色管理',
    action: '變更角色權限 (UPDATE_ROLE_PERMISSIONS)',
    target: 'ROLE-VENDOR',
  },
  {
    id: 'LOG-004',
    actionTime: '2026-04-29 11:10:05',
    operator: 'admin_sys',
    module: '商品管理',
    action: '強制下架商品 (FORCE_TAKEDOWN_PRODUCT)',
    target: 'TBA250310001',
  },
  {
    id: 'LOG-005',
    actionTime: '2026-04-28 09:15:30',
    operator: 'admin_finance',
    module: '訂單管理',
    action: '取消訂單 (CANCEL_ORDER)',
    target: 'ORD-20260428-001',
  },
  {
    id: 'LOG-006',
    actionTime: '2026-04-27 17:50:22',
    operator: 'admin_hr',
    module: '角色管理',
    action: '新增角色 (CREATE_ROLE)',
    target: 'ROLE-GUEST',
  },
  {
    id: 'LOG-007',
    actionTime: '2026-04-27 10:05:11',
    operator: 'admin_sys',
    module: '使用者管理',
    action: '啟用帳號 (ENABLE_USER)',
    target: 'user_john_doe',
  },
];

const AuditLogPage: React.FC = () => {
  const columns: ColumnsType<AuditLog> = [
    {
      title: '操作時間',
      dataIndex: 'actionTime',
      key: 'actionTime',
      width: '15%',
    },
    {
      title: '操作人員',
      dataIndex: 'operator',
      key: 'operator',
      width: '15%',
    },
    {
      title: '操作模組',
      dataIndex: 'module',
      key: 'module',
      width: '15%',
      render: (text) => {
        let color = 'default';
        if (text === '使用者管理') color = 'blue';
        if (text === '角色管理') color = 'purple';
        if (text === '商品管理') color = 'cyan';
        if (text === '訂單管理') color = 'green';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '執行動作',
      dataIndex: 'action',
      key: 'action',
      width: '35%',
    },
    {
      title: '影響目標',
      dataIndex: 'target',
      key: 'target',
      width: '20%',
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={3} style={{ margin: 0 }}>操作紀錄 (Audit Log)</Title>
      </div>
      
      <Card>
        <Table
          columns={columns}
          dataSource={mockAuditLogs}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default AuditLogPage;
