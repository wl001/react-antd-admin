import React, { Component } from 'react'
import { NavLink} from 'react-router-dom'
//菜单数据
import menuConfig from './../../config/menuConfig'
//通过connect（redux连接器）使react关联redux 点击的时候需要触发action 引入action
import { connect } from 'react-redux'
// 引入action
import { switchMenu } from './../../redux/action'
import './index.less'
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
class NavLeft extends Component {
    state = {
        selectedKey:'' //点击当前路由高亮
    }
    componentWillMount(){
        //拿到菜单数据
        const menuTreeNode = this.renderMenu(menuConfig)
        //当前路由 /city
        let selectedKey = window.location.hash.replace(/#|\?.*$/g,'')
        this.setState({
            menuTreeNode,
            selectedKey
        })
    }
    // 菜单渲染 data菜单数据
    renderMenu = (data)=>{    
        return data.map((item,index)=>{
            if (item.children){//递归 有子节点再次遍历子节点
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }            
            return (
                <Menu.Item title={item.title} key={item.key}>
                    <NavLink to={item.key}>{item.title}</NavLink>
                </Menu.Item>
            )
        })
    }
    // handleClick = (item)不好使 需要{item}解构的方式才可以
    handleClick = ({ item, key })=>{
        // 事件派发，自动调用reducer，通过reducer保存到store对象中 
        const { dispatch } = this.props;
        console.log(item.props)
        dispatch(switchMenu(item.props.title));
        this.setState({
            selectedKey: key //点击当前的路由 /city高亮
        });
      
    }
    render() {
        return (
            <div> 
                <NavLink to="/admin/home" onClick={this.homeHandleClick}>
                    <div className="logo">
                        <img src="/assets/logo-ant.svg" alt="" />
                        <h1>Imooc MS</h1>
                    </div>
                </NavLink>
                <Menu 
                    theme='dark' 
                    selectedKeys={[this.state.selectedKey]}
                    onClick={this.handleClick}
                > 
                    {this.state.menuTreeNode}
                </Menu> 
            </div>
        )
    }
}
export default connect()(NavLeft)