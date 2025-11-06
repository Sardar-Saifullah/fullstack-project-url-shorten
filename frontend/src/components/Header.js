import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { LinkOutlined, UnorderedListOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header = () => {
  const location = useLocation();

  return (
    <AntHeader style={{ display: 'flex', alignItems: 'center' }}>
      <Title level={3} style={{ color: 'White', margin: 0, marginRight: '24px' }}>
        URL Shortener
      </Title>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        style={{ flex: 1}}
      >
        <Menu.Item key="/" icon={<LinkOutlined />}>
          <Link to="/">Create URL</Link>
        </Menu.Item>
        <Menu.Item key="/urls" icon={<UnorderedListOutlined />}>
          <Link to="/urls">All URLs</Link>
        </Menu.Item>
      </Menu>
    </AntHeader>
  );
};

export default Header;