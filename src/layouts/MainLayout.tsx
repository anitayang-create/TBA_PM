import React, { useState } from 'react';
import { Layout, Menu, theme, Typography } from 'antd';
import { UserOutlined, TeamOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ShoppingOutlined, IdcardOutlined } from '@ant-design/icons';
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
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center' }}>
          <div
            style={{ padding: '0 24px', cursor: 'pointer', fontSize: '18px' }}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
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
