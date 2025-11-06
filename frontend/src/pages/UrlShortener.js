import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Card, message, Row, Col, Statistic } from 'antd';
import { createShortUrl } from '../store/actions/urlActions';
import { CopyOutlined, LinkOutlined } from '@ant-design/icons';

const UrlShortener = () => {
  const dispatch = useDispatch();
  const { creating, urls, error } = useSelector(state => state.url);
  const [form] = Form.useForm();
  const [recentUrl, setRecentUrl] = useState(null);

  const onFinish = async (values) => {
    try {
     const result = await dispatch(createShortUrl(values.url));
      // Fix: Use the returned result directly
      const newUrl = result.payload.data;
      setRecentUrl(newUrl);
      form.resetFields();
      message.success('Short URL created successfully!');
    } catch (error) {
      message.error(error.message || 'Failed to create short URL');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    message.success('Copied to clipboard!');
  };

  const getShortUrl = (shortCode) => {
    return `${window.location.origin}/r/${shortCode}`;
  };

// Fix: Calculate total URLs and clicks
  const totalUrls = urls.length;
  const totalClicks = urls.reduce((sum, url) => sum + (url.accessCount || 0), 0);

   return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Create Short URL" bordered={false}>
            <Form
              form={form}
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                name="url"
                label="Original URL"
                rules={[
                  { required: true, message: 'Please enter a URL' },
                  { type: 'url', message: 'Please enter a valid URL', warningOnly: true }
                ]}
              >
                <Input
                  placeholder="https://example.com/very-long-url"
                  size="large"
                  prefix={<LinkOutlined />}
                />
              </Form.Item>
              
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={creating}
                  size="large"
                  block
                >
                  Create Short URL
                </Button>
              </Form.Item>
            </Form>

            {recentUrl && (
              <Card
                type="inner"
                title="Your Short URL"
                style={{ marginTop: 16 }}
              >
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                  <Input
                    value={getShortUrl(recentUrl.shortCode)}
                    readOnly
                    style={{ flex: 1 }}
                  />
                  <Button
                    icon={<CopyOutlined />}
                    onClick={() => copyToClipboard(getShortUrl(recentUrl.shortCode))}
                  >
                    Copy
                  </Button>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Input
                    value={recentUrl.originalUrl}
                    readOnly
                    style={{ flex: 1 }}
                  />
                  <Button
                    icon={<CopyOutlined />}
                    onClick={() => copyToClipboard(recentUrl.originalUrl)}
                  >
                    Copy
                  </Button>
                </div>
              </Card>
            )}
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Total URLs"
                  value={totalUrls}
                  prefix={<LinkOutlined />}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Total Clicks"
                  value={totalClicks}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default UrlShortener;