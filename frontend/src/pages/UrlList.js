import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  Card,
  Button,
  Modal,
  Form,
  Input,
  message,
  Tag,
  Space,
  Popconfirm
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  LinkOutlined
} from '@ant-design/icons';
import { getAllUrls, updateUrl, deleteUrl } from '../store/actions/urlActions';

const UrlList = () => {
  const dispatch = useDispatch();
  const { urls, loading, error } = useSelector(state => state.url);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingUrl, setEditingUrl] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getAllUrls());
  }, [dispatch]);

  const handleEdit = (url) => {
    setEditingUrl(url);
    form.setFieldsValue({ url: url.originalUrl });
    setEditModalVisible(true);
  };

  const handleUpdate = async (values) => {
    try {
      await dispatch(updateUrl(editingUrl.shortCode, values.url));
      message.success('URL updated successfully!');
      setEditModalVisible(false);
      setEditingUrl(null);
    } catch (error) {
      message.error(error || 'Failed to update URL');
    }
  };

  const handleDelete = async (shortCode) => {
    try {
      await dispatch(deleteUrl(shortCode));
      message.success('URL deleted successfully!');
    } catch (error) {
      message.error(error || 'Failed to delete URL');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    message.success('Copied to clipboard!');
  };

  const getShortUrl = (shortCode) => {
    return `${window.location.origin}/r/${shortCode}`;
  };

  const columns = [
    {
      title: 'Short Code',
      dataIndex: 'shortCode',
      key: 'shortCode',
      render: (text, record) => (
        <Space>
          <Tag color="blue">{text}</Tag>
          <Button
            icon={<CopyOutlined />}
            size="small"
            onClick={() => copyToClipboard(getShortUrl(text))}
          >
            Copy
          </Button>
        </Space>
      )
    },
    {
      title: 'Original URL',
      dataIndex: 'originalUrl',
      key: 'originalUrl',
      ellipsis: true,
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      )
    },
    {
      title: 'Clicks',
      dataIndex: 'accessCount',
      key: 'accessCount',
      width: 100,
      render: (count) => <Tag color="green">{count}</Tag>
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure to delete this URL?"
            onConfirm={() => handleDelete(record.shortCode)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title="All Short URLs"
        extra={
          <Button
            type="primary"
            icon={<LinkOutlined />}
            onClick={() => dispatch(getAllUrls())}
            loading={loading}
          >
            Refresh
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={urls}
          rowKey="id"
          loading={loading}
          scroll={{ x: 800 }}
        />
      </Card>

      <Modal
        title="Edit URL"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdate} layout="vertical">
          <Form.Item
            name="url"
            label="Original URL"
            rules={[
              { required: true, message: 'Please enter a URL' },
              { type: 'url', message: 'Please enter a valid URL' }
            ]}
          >
            <Input placeholder="https://example.com" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
              <Button onClick={() => setEditModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UrlList;