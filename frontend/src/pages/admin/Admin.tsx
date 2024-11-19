import React from 'react';
import { Layout, Menu } from 'antd';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import { UserOutlined, FileAddOutlined } from '@ant-design/icons';
import UsersPage from '../../components/admin/user/user';
import SubsPage from '../../components/admin/subcription/subcription';
import logo from '../../assets/images/logo.png';
import './admin.css';

const { Header, Content, Footer, Sider } = Layout;

const AdminLayout = () => {
    const location = useLocation();

    const getPageTitle = () => {
        switch (location.pathname) {
            case '/admin/users':
                return 'Users Management';
            case '/admin/subs':
                return 'Subscription Management';
            default:
                return 'Admin Dashboard';
        }
    };

    // Define menu items as an array
    const menuItems = [
        {
            key: '/admin/users',
            icon: <UserOutlined />,
            label: <Link to="/admin/users">Users</Link>,
        },
        {
            key: '/admin/subs',
            icon: <FileAddOutlined />,
            label: <Link to="/admin/subs">Subscriptions</Link>,
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible>
                <div className="logo-sidebar">
                    <img src={logo} alt="Logo" />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    items={menuItems}
                    selectedKeys={[location.pathname]} // Highlight active menu item based on path
                />
            </Sider>

            <Layout className="site-layout">
                <Header style={{ padding: 0, background: '#fff' }}>
                    <h2 style={{ paddingLeft: 20 }}>{getPageTitle()}</h2>
                </Header>
                <Content className="content">
                    <Routes>
                        <Route path="users" element={<UsersPage />} />
                        <Route path="subs" element={<SubsPage />} />
                    </Routes>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Admin Dashboard ©2024</Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
