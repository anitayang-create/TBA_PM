import React, { useState } from 'react';
import { Layout, Menu, theme, Typography, Avatar, Dropdown, message } from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined, TeamOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ShoppingOutlined, IdcardOutlined, OrderedListOutlined, FilePptOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    // 實務上這裡會清除 localStorage/cookie 中的 token
    message.success('已成功登出');
    navigate('/login');
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '登出',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div style={{ height: 32, margin: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap', overflow: 'hidden' }}>
          {!collapsed && (
            <Title level={4} style={{ margin: 0 }}>
              TBA 總管理後台
            </Title>
          )}
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: '/permission/users',
              icon: <UserOutlined />,
              label: '使用者管理',
            },
            {
              key: '/permission/roles',
              icon: <TeamOutlined />,
              label: '角色管理',
            },
            {
              key: '/product',
              icon: <ShoppingOutlined />,
              label: '商品管理',
            },
            {
              key: '/member',
              icon: <IdcardOutlined />,
              label: '會員管理',
            },
            {
              key: '/order',
              icon: <OrderedListOutlined />,
              label: '訂單管理',
            },
            {
              key: 'content',
              icon: <FilePptOutlined />,
              label: '內容管理',
              children: [
                {
                  key: '/content/banners',
                  label: 'Banner 管理',
                },
                {
                  key: '/content/faq',
                  label: 'FAQ 管理',
                },
              ]
            },
            {
              key: 'system',
              icon: <SettingOutlined />,
              label: '系統管理',
              children: [
                {
                  key: '/system/audit-log',
                  label: '操作紀錄',
                },
              ]
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{ padding: '0 24px', cursor: 'pointer', fontSize: '18px' }}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          <div style={{ padding: '0 24px' }}>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
              <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1677ff' }} />
                <span>管理員</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
