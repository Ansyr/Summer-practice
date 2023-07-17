import '../App.css'
import { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { Layout, Button, theme } from 'antd';
import {Route, Routes} from "react-router-dom";
import NavBar from "../shared/components/navbar";
import styles from "./styles.module.scss"
import BookInfo from "../pages/book-info";
import BookStatistic from "../pages/book-statistic";
import BookCreatePage from "../pages/create-book";
import UserInfo from "../pages/user-info";
import UserCreate from "../pages/create-user";
import CreateAuthor from "../pages/create-author";
import AuthorInfo from "../pages/author-info";
import Statistic from "../pages/book-statistic";
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
                        <Route path={"/useradd"} element={<UserCreate/>}/>
                        <Route path={"/bookadd"} element={<BookCreatePage/>}/>
                        <Route path={"/authoradd"} element={<CreateAuthor/>}/>
                        <Route path={"/tableuser"} element={<UserInfo/>}/>
                        <Route path={"/bookinfo"} element={<BookInfo/>}/>
                        <Route path={"/popularbook"} element={<Statistic/>}/>
                        <Route path={"/authorinfo"} element={<AuthorInfo/>} />
                    </Routes>

                </Content>
            </Layout>
        </Layout>
    )
}

export default App
