import React from 'react';
import { Card, Form, InputNumber, Radio, Button, Space, Typography, message, Divider } from 'antd';
import { SettingOutlined, DollarOutlined, PercentageOutlined, CarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const SystemSettings: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    message.success('系統設定已更新');
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
        <SettingOutlined style={{ fontSize: 24, color: '#1677ff' }} />
        <Title level={2} style={{ margin: 0 }}>系統設定</Title>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          pricingMultiplier: 1.5,
          artistCommission: 20,
          shippingType: 'fixed',
          fixedShippingFee: 150
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* 定價公式 */}
          <Card 
            title={<Space><DollarOutlined />定價公式設定</Space>}
            variant="outlined"
          >
            <Text type="secondary" style={{ marginBottom: 16, display: 'block' }}>
              設定商品對外售價的計算倍率。公式：售價 = 製造商單價 x 設定倍率
            </Text>
            <Form.Item
              label="售價倍率"
              name="pricingMultiplier"
              extra="例如：1.5 表示售價為成本的 1.5 倍"
              rules={[{ required: true, message: '請輸入倍率' }]}
            >
              <InputNumber 
                min={1} 
                step={0.1} 
                precision={2} 
                style={{ width: 200 }} 
                addonAfter="倍"
              />
            </Form.Item>
          </Card>

          {/* 分潤設定 */}
          <Card 
            title={<Space><PercentageOutlined />分潤比例設定</Space>}
            variant="outlined"
          >
            <Text type="secondary" style={{ marginBottom: 16, display: 'block' }}>
              設定藝術家從商品售價中獲得的固定分潤比例。
            </Text>
            <Form.Item
              label="藝術家分潤"
              name="artistCommission"
              rules={[{ required: true, message: '請輸入比例' }]}
            >
              <InputNumber 
                min={0} 
                max={100} 
                style={{ width: 200 }} 
                addonAfter="%" 
              />
            </Form.Item>
          </Card>

          {/* 運費設定 */}
          <Card 
            title={<Space><CarOutlined />運費規則設定</Space>}
            variant="outlined"
          >
            <Text type="secondary" style={{ marginBottom: 16, display: 'block' }}>
              設定全站的運費規則。
            </Text>
            <Form.Item label="運費類型" name="shippingType">
              <Radio.Group>
                <Radio value="fixed">全站固定運費</Radio>
                <Radio value="free">全站免運</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.shippingType !== currentValues.shippingType}
            >
              {({ getFieldValue }) => 
                getFieldValue('shippingType') === 'fixed' ? (
                  <Form.Item
                    label="固定運費金額"
                    name="fixedShippingFee"
                    rules={[{ required: true, message: '請輸入運費金額' }]}
                    style={{ marginTop: 16 }}
                  >
                    <InputNumber 
                      min={0} 
                      style={{ width: 200 }} 
                      addonAfter="元" 
                    />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
          </Card>

          <Divider />

          <div style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" size="large">
              儲存設定
            </Button>
          </div>
        </Space>
      </Form>
    </div>
  );
};

export default SystemSettings;
