import '../App.css'
import { useState } from 'react';
import styles from './styles.module.scss'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { Layout, Button, theme } from 'antd';
import NavBar from "../shared/components/menu"
import UserCreatePage from "../pages/create-user";
const { Header, Sider, Content } = Layout;

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
  return (
      <Layout className={styles.main}>
          <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className="demo-logo-vertical" />
              <NavBar/>
          </Sider>
          <Layout>
              <Header style={{ padding: 0, background: colorBgContainer }}>
                  <Button
                      type="text"
                      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                      onClick={() => setCollapsed(!collapsed)}
                      style={{
                          fontSize: '16px',
                          width: 64,
                          height: 64,
                      }}
                  />
              </Header>
              <Content
                  style={{
                      margin: '24px 16px',
                      padding: 24,
                      minHeight: 280,
                      background: colorBgContainer,
                  }}
              >
                <UserCreatePage/>
              </Content>
          </Layout>
      </Layout>
  )
}

export default App
