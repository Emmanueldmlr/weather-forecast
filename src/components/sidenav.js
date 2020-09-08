import React from 'react'
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import {Link} from 'react-router-dom'
const { Sider } = Layout;


export default class SideNav extends React.Component{
    render() {
       const { collapseStatus} = this.props
        return (
            <>
                <Sider trigger={null} collapsible collapsed={collapseStatus}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <Link to='/'>Home</Link>
                         </Menu.Item>
                        <Menu.Item key="2" icon={<SearchOutlined />}>
                            <Link to='/search-location'>Search</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
            </>
        )
    }
}