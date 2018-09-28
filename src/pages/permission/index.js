import React from 'react'
import { Card, Button, message, Modal } from 'antd'
import ETable from '../../components/ETable/index'
import axios from '../../axios/index'
import Utils from '../../util/util'
import RoleForm from './addFrom'
import PermEditForm from './PermEditForm'
import RoleAuthForm from './RoleAuthForm'


export default class PermissionUser extends React.Component {
    state = {
        list:[]
    };
    componentWillMount() {
        this.requestList();
    }
    //请求数据
    requestList = () => {
        axios.requestList(this,'/role/list',{},true)
    }
    // 角色创建
    handleRole = () => {
        this.setState({
            isRoleVisible: true
        })
    }
    // 角色提交
    handleRoleSubmit = () => {
        let data = this.roleForm.props.form.getFieldsValue();
        axios.ajax({
            url: '/user/add',
            data: {
                params: {
                    ...data
                }
            }
        }).then((res) => {
            if (res) {
                this.setState({
                    isRoleVisible: false
                })
                this.roleForm.props.form.resetFields();//重置表单
                this.requestList();
                message.success('创建成功')
            }
        })
    }
    //权限设置
    handlePermission = () => {
        if (!this.state.selectedItem) {
            Modal.info({
                title: '信息',
                content: '请选择一个角色'
            })
            return;
        }
        this.setState({
            isPermVisible: true,
            detailInfo: this.state.selectedItem
        });
        let menuList = this.state.selectedItem.menus;
        this.setState({
            menuInfo: menuList
        })
    }
    //权限模态框的确定按钮
    handlePermEditSubmit = () => {
        //获取表单所有的值
        let data = this.roleForm.props.form.getFieldsValue();
        //当前操作的角色id
        data.role_id = this.state.selectedItem.id;
        //onCheck事件会把用户勾选的key值带回来
        data.menus = this.state.menuInfo;
        axios.ajax({
            url: '/user/edit',
            data: {
                params: {
                    ...data
                }
            }
        }).then((res) => {
            if (res) {
                this.setState({
                    isPermVisible: false
                })
                this.requestList();
                message.success('权限设置成功')
            }
        })
    }
    // 用户授权
    handleUserAuth = () => {
        if (!this.state.selectedItem) {
            Modal.info({
                title: '信息',
                content: '未选中任何项目'
            })
            return;
        }
        this.getRoleUserList(this.state.selectedItem.id);
        this.setState({
            isUserVisible: true,
            isAuthClosed: false,
            detailInfo: this.state.selectedItem
        });
    }
    //根据角色id查询得到分配的用户权限数据
     getRoleUserList = (id)=>{
        axios.ajax({
            url:'/role/user_list',
            data:{
                params:{
                    id:id
                }
            }
        }).then((res)=>{ 
            if(res){
                this.getAuthUserList(res.result);
            }
        })
    }
    // 筛选目标用户  dataSource数据源
    getAuthUserList = (dataSource) => {
        const mockData = [];//数据源  左边穿梭框
        const targetKeys = [];//目标源 右边穿梭框
        if (dataSource && dataSource.length > 0) {
            for (let i = 0; i < dataSource.length; i++) {
                const data = {
                    key: dataSource[i].user_id,//用户id
                    title: dataSource[i].user_name,//穿梭框展示的数据
                    status: dataSource[i].status,
                };
                if (data.status === 1) {
                    targetKeys.push(data.key);//右侧穿梭框  数据是key的集合 用户id
                }
                //需要完整的数据 不能else
                mockData.push(data);
                              
            }
        }
        this.setState({ mockData, targetKeys });
    };

    patchUserInfo = (targetKeys) => {
        this.setState({
            targetKeys: targetKeys
        });
    };
    // 用户授权提交
    handleUserSubmit = () => {
        let data = {};
        data.user_ids = this.state.targetKeys || [];//目标源数据 右边穿梭框
        data.role_id = this.state.selectedItem.id;//当前列表选中的这一项角色id
        axios.ajax({
            url: '/user/edit',
            data: {
                params: {
                    ...data
                }
            }
        }).then((res) => {
            if (res) {
                this.setState({
                    isUserVisible: false
                })
                this.requestList(); 
            }
        })
    }
    render() {
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            }, {
                title: '角色名称',
                dataIndex: 'role_name'
            }, {
                title: '创建时间',
                dataIndex: 'create_time',
                render: Utils.formatTime
            }, {
                title: '使用状态',
                dataIndex: 'status',
                render(status) {
                    if (status == 1) {
                        return "启用"
                    } else {
                        return "停用"
                    }
                }
            }, {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render: Utils.formatTime
            }, {
                title: '授权人',
                dataIndex: 'authorize_user_name',
            }
        ];
        return (
            <div>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.handleRole}>创建角色</Button>
                    <Button type="primary" onClick={this.handlePermission}>设置权限</Button>
                    <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button> 
                </Card>   
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        dataSource={this.state.list}
                        columns={columns}
                    />
                    {/* 角色创建模态框 */}
                    <Modal
                        title="创建角色"
                        className='aaaaa'//容器类名可调节模态框位置大小
                        visible={this.state.isRoleVisible}
                        onOk={this.handleRoleSubmit}
                        onCancel={() => {
                            //重置
                            this.roleForm.props.form.resetFields();
                            this.setState({
                                isRoleVisible: false
                            })
                        }}
                    >
                        {/* 角色创建表单 */}
                        <RoleForm wrappedComponentRef={(inst) => this.roleForm = inst} />
                    </Modal>
                    {/* 权限设置 */}
                    <Modal
                        title="权限设置"
                        visible={this.state.isPermVisible}
                        width={600}
                        onOk={this.handlePermEditSubmit}
                        onCancel={() => {
                            this.setState({
                                isPermVisible: false
                            })
                        }}>
                        {/* 权限设置表单 */}
                        <PermEditForm
                            wrappedComponentRef={(inst) => this.roleForm = inst}
                            detailInfo={this.state.detailInfo}
                            menuInfo={this.state.menuInfo || []}
                            patchMenuInfo={(checkedKeys) => {
                                this.setState({
                                    menuInfo: checkedKeys
                                });
                            }}
                        />
                    </Modal>
                    <Modal
                        title="用户授权"
                        visible={this.state.isUserVisible}
                        width={800}
                        onOk={this.handleUserSubmit}
                        onCancel={() => {
                            this.setState({
                                isUserVisible: false
                            })
                        }}>
                        <RoleAuthForm
                            wrappedComponentRef={(inst) => this.userAuthForm = inst}
                            isClosed={this.state.isAuthClosed}
                            detailInfo={this.state.detailInfo}
                            targetKeys={this.state.targetKeys}
                            mockData={this.state.mockData}
                            patchUserInfo={this.patchUserInfo}//父组件方法
                        />
                    </Modal>
                </div>    
            </div>
        )
    }
}

