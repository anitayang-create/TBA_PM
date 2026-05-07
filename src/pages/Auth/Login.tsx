import React, { useState } from 'react';
import { Card, Form, Input, Button, Checkbox, message, Typography, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const onFinish = (_values: any) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success('登入成功！');
      navigate('/permission/users');
    }, 1000);
  };

  const handleForgotPassword = () => {
    setIsModalOpen(true);
  };

  const handleResetPassword = (_values: any) => {
    message.success('密碼修改成功！');
    setIsModalOpen(false);
  };

  return (
    <div className="login-container">
      <Card className="login-card" bordered={false}>
        <div className="login-header">
          <Title level={3} className="login-title">TBA 平台後台</Title>
          <Text className="login-subtitle">請輸入您的帳號密碼以登入</Text>
        </div>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="username"
          >
            <Input prefix={<UserOutlined />} placeholder="帳號" />
          </Form.Item>
          <Form.Item
            name="password"
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密碼"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>記住我</Checkbox>
            </Form.Item>

            <a className="login-forgot" onClick={handleForgotPassword}>
              忘記密碼？
            </a>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
              登入
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Modal
        title="重置密碼"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form onFinish={handleResetPassword} layout="vertical">
          <Form.Item
            label="帳號"
            name="username"
            rules={[{ required: true, message: '請輸入帳號' }]}
          >
            <Input placeholder="請輸入您的帳號" />
          </Form.Item>
          <Form.Item
            label="新密碼"
            name="newPassword"
            rules={[{ required: true, message: '請輸入新密碼' }]}
          >
            <Input.Password placeholder="請輸入新密碼" />
          </Form.Item>
          <Form.Item
            label="確認新密碼"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: '請再次輸入新密碼' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('兩次輸入的密碼不一致'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="請再次輸入新密碼" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              確認修改
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Login;
