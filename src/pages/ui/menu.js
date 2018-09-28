import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Icon ,Button} from 'antd';
//菜单数据
import menuConfig from './../../config/menuConfig'
const SubMenu = Menu.SubMenu;
export default class Home extends Component {
    state = {
        theme: "dark",
        current: "",
        open: "",
        collapsed: false,
    }
    componentWillMount() {
        const menuTreeNode = this.renderMenu(menuConfig)
        this.setState({
            menuTreeNode
        })
    }
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.children) {//递归 有子节点再次遍历子节点
                return (
                    <SubMenu key={item.key} title={<span><Icon type="mail" /><span>{item.title}</span></span>}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            // 菜单数据改一下 都有子级就会出现图标了
            return (
                <Menu.Item title={item.title} key={item.key}>
                    <NavLink  to={'/ui/menu'}>{item.title}</NavLink>
                </Menu.Item>
            )
        })
    }
    openMenu = data => {
        console.log(data)
        this.setState({
            open: data[data.length - 1]
        });
    };
    handleClick = e => {
        console.log(e);
        this.setState({
            current: e.key
        });
    };
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        return (
            // <div className="home-wrap">
            //     欢迎进入IMooc后台管理系统
            // </div>
            <div style={{ width: 256 }}>
                <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
                
                <Menu
                    theme={this.state.theme}
                    mode="inline"
                    inlineCollapsed={this.state.collapsed}
                    // 下边四个方法不要则没有收起的bug
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    openKeys={[this.state.open]}
                    onOpenChange={this.openMenu}
                >
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}