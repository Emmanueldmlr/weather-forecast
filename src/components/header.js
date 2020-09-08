import React from 'react'
import { Layout } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

const { Header} = Layout;
export default class HeaderBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle(){
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render() {
        return (
            <>
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: this.toggle,
                    })}
                </Header>
            </>
        )
    }
}