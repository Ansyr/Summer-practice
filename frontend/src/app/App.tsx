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
import {Route, Routes} from "react-router-dom";
import BookCreatePage from "../pages/create-book";
import TableUserPage from "../pages/table-user";
import TableBookPage from "../pages/table-book";

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
                  <Routes>
                      <Route path={"/useradd"} element={<UserCreatePage/>}/>
                      <Route path={"/book"} element={<BookCreatePage/>}/>
                      <Route path={"/tableuser"} element={<TableUserPage/>}/>
                      <Route path={"/tablebook"} element={<TableBookPage/>}/>
                  </Routes>

              </Content>
          </Layout>
      </Layout>
  )
}

export default App
