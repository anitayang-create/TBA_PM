import React, { useState } from 'react';
import { Typography, Tabs, Table, Badge, Button, Space, Switch, Modal, Form, Input, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { User, Vendor } from '../../models/user';
import { initialRoles } from '../../models/role';

const { Title } = Typography;
const { TabPane } = Tabs;

// Mock Data
const initialPlatformUsers: User[] = [
  {
    id: 1,
    email: 'admin@tba.com',
    name: '總管理員A',
    role: '超級管理員',
    status: 'active',
    lastModifiedBy: '系統',
    lastModifiedAt: '2023-11-01 10:00:00',
  },
  {
    id: 2,
    email: 'cs@tba.com',
    name: '客服小美',
    role: '客服人員',
    status: 'active',
    lastModifiedBy: '總管理員A',
    lastModifiedAt: '2023-11-02 11:30:00',
  },
  {
    id: 3,
    email: 'marketing@tba.com',
    name: '行銷老王',
    role: '行銷人員',
    status: 'inactive',
    lastModifiedBy: '總管理員A',
    lastModifiedAt: '2023-11-03 14:15:00',
  },
];

const initialVendors: Vendor[] = [
  {
    id: 1,
    email: 'vendor1@example.com',
    name: '好神科技',
    companyId: 'V123',
    status: 'active',
    lastModifiedBy: '系統',
    lastModifiedAt: '2023-11-04 10:00:00',
  }
];

const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('platform');
  const [platformUsers, setPlatformUsers] = useState<User[]>(initialPlatformUsers);
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);

  // Modal states
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isVendorModalVisible, setIsVendorModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);

  const [userForm] = Form.useForm();
  const [vendorForm] = Form.useForm();

  const toggleUserStatus = (id: number, isVendor: boolean = false) => {
    if (isVendor) {
      setVendors((prev) =>
        prev.map((v) => (v.id === id ? { ...v, status: v.status === 'active' ? 'inactive' : 'active' } : v))
      );
    } else {
      setPlatformUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } : user))
      );
    }
  };

  // User Actions
  const handleOpenUserModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      userForm.setFieldsValue({
        email: user.email,
        name: user.name,
        role: user.role,
      });
    } else {
      setEditingUser(null);
      userForm.resetFields();
    }
    setIsUserModalVisible(true);
  };

  const handleUserModalOk = () => {
    userForm.validateFields().then((values) => {
      if (editingUser) {
        setPlatformUsers((prev) =>
          prev.map((u) => (u.id === editingUser.id ? { ...u, ...values, lastModifiedAt: new Date().toLocaleString() } : u))
        );
      } else {
        const newUser: User = {
          id: Date.now(),
          ...values,
          status: 'active',
          lastModifiedBy: '當前使用者',
          lastModifiedAt: new Date().toLocaleString(),
        };
        setPlatformUsers((prev) => [...prev, newUser]);
      }
      setIsUserModalVisible(false);
    });
  };

  // Vendor Actions
  const handleOpenVendorModal = (vendor?: Vendor) => {
    if (vendor) {
      setEditingVendor(vendor);
      vendorForm.setFieldsValue({
        email: vendor.email,
        name: vendor.name,
      });
    } else {
      setEditingVendor(null);
      vendorForm.resetFields();
    }
    setIsVendorModalVisible(true);
  };

  const handleVendorModalOk = () => {
    vendorForm.validateFields().then((values) => {
      if (editingVendor) {
        setVendors((prev) =>
          prev.map((v) => (v.id === editingVendor.id ? { ...v, ...values, lastModifiedAt: new Date().toLocaleString() } : v))
        );
      } else {
        const newVendor: Vendor = {
          id: Date.now(),
          companyId: `V${Date.now().toString().slice(-4)}`,
          ...values,
          status: 'active',
          lastModifiedBy: '當前使用者',
          lastModifiedAt: new Date().toLocaleString(),
        };
        setVendors((prev) => [...prev, newVendor]);
      }
      setIsVendorModalVisible(false);
    });
  };

  const platformColumns: ColumnsType<User> = [
    { title: '編號', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: '名稱', dataIndex: 'name', key: 'name' },
    { title: '角色', dataIndex: 'role', key: 'role' },
    {
      title: '角色狀態',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge status={status === 'active' ? 'success' : 'default'} text={status === 'active' ? '啟用' : '停用'} />
      ),
    },
    { title: '上次修改人員', dataIndex: 'lastModifiedBy', key: 'lastModifiedBy' },
    { title: '上次修改時間', dataIndex: 'lastModifiedAt', key: 'lastModifiedAt' },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleOpenUserModal(record)}>編輯</Button>
          <Switch
            checked={record.status === 'active'}
            onChange={() => toggleUserStatus(record.id, false)}
            checkedChildren="啟用"
            unCheckedChildren="停用"
          />
        </Space>
      ),
    },
  ];

  const vendorColumns: ColumnsType<Vendor> = [
    { title: '編號', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: '廠商名稱', dataIndex: 'name', key: 'name' },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge status={status === 'active' ? 'success' : 'default'} text={status === 'active' ? '啟用' : '停用'} />
      ),
    },
    { title: '上次修改人員', dataIndex: 'lastModifiedBy', key: 'lastModifiedBy' },
    { title: '上次修改時間', dataIndex: 'lastModifiedAt', key: 'lastModifiedAt' },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleOpenVendorModal(record)}>編輯</Button>
          <Switch
            checked={record.status === 'active'}
            onChange={() => toggleUserStatus(record.id, true)}
            checkedChildren="啟用"
            unCheckedChildren="停用"
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>使用者管理</Title>
        <Button 
          type="primary" 
          onClick={() => activeTab === 'platform' ? handleOpenUserModal() : handleOpenVendorModal()}
        >
          {activeTab === 'platform' ? '新增人員' : '新增廠商'}
        </Button>
      </div>
      
      <Tabs activeKey={activeTab} onChange={setActiveTab} type="card">
        <TabPane tab="平台方管理" key="platform">
          <Table<User> columns={platformColumns} dataSource={platformUsers} rowKey="id" pagination={{ defaultPageSize: 10 }} />
        </TabPane>
        <TabPane tab="廠商管理" key="vendor">
          <Table<Vendor> columns={vendorColumns} dataSource={vendors} rowKey="id" pagination={{ defaultPageSize: 10 }} />
        </TabPane>
      </Tabs>

      {/* User Modal */}
      <Modal
        title={editingUser ? '編輯平台人員' : '新增平台人員'}
        open={isUserModalVisible}
        onOk={handleUserModalOk}
        onCancel={() => setIsUserModalVisible(false)}
        okText="儲存"
        cancelText="取消"
        destroyOnClose
      >
        <Form form={userForm} layout="vertical" preserve={false}>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: '請輸入Email' }, { type: 'email', message: '信箱格式錯誤' }]}>
            <Input placeholder="請輸入使用者Email" />
          </Form.Item>
          <Form.Item name="name" label="名稱" rules={[{ required: true, message: '請輸入名稱' }]}>
            <Input placeholder="請輸入名稱" />
          </Form.Item>
          <Form.Item name="role" label="角色" rules={[{ required: true, message: '請選擇角色' }]}>
            <Select placeholder="請選擇角色">
              {initialRoles.map((role) => (
                <Select.Option key={role.id} value={role.name}>{role.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Vendor Modal */}
      <Modal
        title={editingVendor ? '編輯廠商' : '新增廠商'}
        open={isVendorModalVisible}
        onOk={handleVendorModalOk}
        onCancel={() => setIsVendorModalVisible(false)}
        okText="儲存"
        cancelText="取消"
        destroyOnClose
      >
        <Form form={vendorForm} layout="vertical" preserve={false}>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: '請輸入Email' }, { type: 'email', message: '信箱格式錯誤' }]}>
            <Input placeholder="請輸入廠商Email" />
          </Form.Item>
          <Form.Item name="name" label="名稱" rules={[{ required: true, message: '請輸入廠商名稱' }]}>
            <Input placeholder="請輸入廠商名稱" />
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default UserManagement;
