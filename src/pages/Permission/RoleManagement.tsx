import React, { useState } from 'react';
import { Typography, Table, Button, Space, Popconfirm, Tooltip, Modal, Form, Input, Checkbox } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { initialRoles, AVAILABLE_MODULES } from '../../models/role';
import type { Role, Permission } from '../../models/role';

const { Title } = Typography;

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(initialRoles);

  // Modal states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [form] = Form.useForm();
  
  // Matrix local state
  const [permissionsMatrix, setPermissionsMatrix] = useState<Permission[]>([]);

  const handleDisable = (id: number) => {
    setRoles((prev) => prev.filter((role) => role.id !== id));
  };

  const handleOpenModal = (role?: Role) => {
    if (role) {
      setEditingRole(role);
      form.setFieldsValue({ name: role.name });
      setPermissionsMatrix(role.permissions || AVAILABLE_MODULES.map(module => ({
        module, read: false, create: false, update: false, delete: false
      })));
    } else {
      setEditingRole(null);
      form.resetFields();
      setPermissionsMatrix(AVAILABLE_MODULES.map(module => ({
        module, read: false, create: false, update: false, delete: false
      })));
    }
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingRole) {
        setRoles(prev => prev.map(r => r.id === editingRole.id ? { 
          ...r, 
          name: values.name, 
          permissions: permissionsMatrix 
        } : r));
      } else {
        const newRole: Role = {
          id: Date.now(),
          name: values.name,
          boundUsersCount: 0,
          createdAt: new Date().toLocaleString(),
          isDeletable: true,
          permissions: permissionsMatrix,
        };
        setRoles(prev => [...prev, newRole]);
      }
      setIsModalVisible(false);
    });
  };

  const togglePermission = (moduleName: string, field: keyof Permission, checked: boolean) => {
    setPermissionsMatrix(prev => prev.map(p => {
      if (p.module === moduleName) {
        const newP = { ...p, [field]: checked };
        
        // 增強的 UX 邏輯：有寫入權限必定需要檢視權限
        if (field !== 'read' && checked) {
          newP.read = true;
        }
        // 如果取消檢視權限，則相關的寫入權限也一併取消
        if (field === 'read' && !checked) {
          newP.create = false;
          newP.update = false;
          newP.delete = false;
        }
        return newP;
      }
      return p;
    }));
  };

  const columns: ColumnsType<Role> = [
    {
      title: '角色名稱',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '建立時間',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => {
        const canDisable = record.isDeletable && record.boundUsersCount === 0;
        let disableReason = '';
        if (!record.isDeletable) disableReason = '系統預設角色不可停用';
        else if (record.boundUsersCount > 0) disableReason = `尚有綁定人員 (${record.boundUsersCount}人)，無法停用`;

        return (
          <Space size="middle">
            <Button type="link" onClick={() => handleOpenModal(record)}>編輯</Button>
            <Tooltip title={disableReason}>
              <span>
                <Popconfirm
                  title="確定要停用此角色嗎？"
                  onConfirm={() => handleDisable(record.id)}
                  disabled={!canDisable}
                >
                  <Button type="link" danger disabled={!canDisable} style={{ pointerEvents: canDisable ? 'auto' : 'none' }}>停用</Button>
                </Popconfirm>
              </span>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  const permissionColumns: ColumnsType<Permission> = [
    { title: '模組名稱', dataIndex: 'module', key: 'module', align: 'left' as const },
    { 
      title: '檢視 (R)', 
      key: 'read', 
      align: 'center' as const,
      width: 100,
      render: (_, record) => (
        <Checkbox checked={record.read} onChange={e => togglePermission(record.module, 'read', e.target.checked)} />
      )
    },
    { 
      title: '新增 (C)', 
      key: 'create', 
      align: 'center' as const,
      width: 100,
      render: (_, record) => (
        <Checkbox checked={record.create} onChange={e => togglePermission(record.module, 'create', e.target.checked)} />
      )
    },
    { 
      title: '編輯 (U)', 
      key: 'update', 
      align: 'center' as const,
      width: 100,
      render: (_, record) => (
        <Checkbox checked={record.update} onChange={e => togglePermission(record.module, 'update', e.target.checked)} />
      )
    },
    { 
      title: '刪除/停用 (D)', 
      key: 'delete', 
      align: 'center' as const,
      width: 150,
      render: (_, record) => (
        <Checkbox checked={record.delete} onChange={e => togglePermission(record.module, 'delete', e.target.checked)} />
      )
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>角色管理</Title>
        <Button type="primary" onClick={() => handleOpenModal()}>新增角色</Button>
      </div>
      <Table<Role>
        columns={columns}
        dataSource={roles}
        rowKey="id"
        pagination={{ defaultPageSize: 10 }}
      />

      <Modal
        title={editingRole ? '編輯角色' : '新增角色'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        okText="儲存"
        cancelText="取消"
        destroyOnClose
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item 
            name="name" 
            label="角色名稱" 
            rules={[{ required: true, message: '請輸入角色名稱' }]}
          >
            <Input placeholder="請輸入角色名稱" disabled={editingRole?.isDeletable === false} />
          </Form.Item>
          
          <div style={{ marginTop: 24, marginBottom: 8, fontWeight: 500, display: 'block' }}>權限設定表</div>
          <Table<Permission>
            columns={permissionColumns}
            dataSource={permissionsMatrix}
            rowKey="module"
            pagination={false}
            bordered
            size="small"
          />
        </Form>
      </Modal>
    </div>
  );
};

export default RoleManagement;
