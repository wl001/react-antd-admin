import React,{ Component } from 'react'
import { Card, Button,  Form, Input, Select, Radio,  message, Modal, DatePicker } from 'antd'
import Moment from 'moment'
import axios from '../../axios/index'
import Utils from '../../util/util'
import BaseForm from '../../components/BaseFrom'
import ETable from '../../components/ETable/index'
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
export default class User extends Component {
    state = {
        list: [],
        isVisible:false
    }

    params = {
        page: 1
    }
    componentDidMount() {
        this.requestList();
    }
    requestList = ()=>{
        axios.requestList(this,'/table/userList',this.params)
    }
    //表单数据
    formList = [
        {
            type: 'INPUT',
            label: '用户名',
            field: 'user_name',
            placeholder: '请输入用户名',
            width: 100,
        },
        {
            type: 'INPUT',
            label: '手机号',
            field: 'user_mobile',
            placeholder: '请输入手机号',
            width: 100,
        }
    ]
    handleFilter = (params)=>{
        //params 接收子组件传过来的值 挂在到this.params上
        this.params = params;
        this.requestList();
    }
    //按钮操作功能 增删改 type类型判断是增加还是其他
    handleOperator = (type)=>{
        //获取当前表格某一行的数据
        let item = this.state.selectedItem;
        if (type === 'create') {
            this.setState({
                title: '创建员工',
                isVisible: true,
                type
            })
        }else if (type === "edit" || type === 'detail') {
            if (!item) {
                Modal.info({
                    title: '信息',
                    content: '请选择一个用户'
                })
                return;
            }
            this.setState({
                title: type === 'edit' ? '编辑用户' : '查看详情',
                isVisible: true,
                userInfo: item,
                type
            })
        } else if (type === "delete"){
            if (!item) {
                Modal.info({
                    title: '信息',
                    content: '请选择一个用户'
                })
                return;
            }
            let _this = this
            Modal.confirm({
                title: '确定删除', 
                content: '你确认删除此员工吗',
                onOk() {
                    axios.ajax({
                        url: '/user/delete',
                        data: {
                            params: {
                                id: item.id
                            }
                        }
                    }).then((res)=>{
                        if (res.code == 0) {
                            _this.setState({
                                isVisible: false
                            })
                            _this.requestList();
                            message.success('删除成功')
                        }
                    })
                },
                onCancel() {
                    message.success('取消删除')
                },
            })
        }
    }
    //创建员工和编辑员工提交
    handleSubmit = ()=>{
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        axios.ajax({
            url: type == 'create' ? '/user/add' : '/user/edit',
            data:{
                params:data
            }
        }).then((res)=>{
            if (res.code === 0) {
                this.userForm.props.form.resetFields();
                this.setState({
                    isVisible: false
                })
                this.requestList();
                type == 'create' ? message.success('添加成功') : message.success('编辑成功')
            }
            //调用完刷新一下页面重新请求一下
            this.requestList();       
        })
        
    }
    render() {
        const columns = [{
            title: 'id',
            dataIndex: 'id'
        }, {
            title: '用户名',
            dataIndex: 'username'
        }, {
            title: '性别',
            dataIndex: 'sex',
            render(sex) {
                return sex == 1 ? '男' : '女'
            }
        }, {
            title: '状态',
            dataIndex: 'state',
            render(state) {
                let config = {
                    '1': '咸鱼一条',
                    '2': '风华浪子',
                    '3': '北大才子一枚',
                    '4': '百度FE',
                    '5': '创业者'
                }
                return config[state];
            }
        }, {
            title: '爱好',
            dataIndex: 'interest',
            render(interest) {
                let config = {
                    '1': '游泳',
                    '2': '打篮球',
                    '3': '踢足球',
                    '4': '跑步',
                    '5': '爬山',
                    '6': '骑行',
                    '7': '桌球',
                    '8': '麦霸'
                }
                return config[interest];
            }
        }, {
            title: '婚否',
            dataIndex: 'isMarried',
            render(isMarried) {
                return isMarried ? '已婚' : '未婚'
            }
        }, {
            title: '生日',
            dataIndex: 'birthday'
        }, {
            title: '联系地址',
            dataIndex: 'address'
        }, {
            title: '早起时间',
            dataIndex: 'time'
        }
        ];
        //员工详情模态框没有底部按钮区域
        let footer = {};
        if(this.state.type=='detail'){
            footer = {
                footer:null
            }
        }
        return(
            <div>
                <Card>
                    <Form layout="inline">
                        <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                    </Form>
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" icon="plus" onClick={() => this.handleOperator('create')}>创建员工</Button>
                    <Button icon="edit" onClick={() => this.handleOperator('edit')}>编辑员工</Button>
                    <Button onClick={() => this.handleOperator('detail')}>员工详情</Button>
                    <Button type="danger" icon="delete" onClick={() => this.handleOperator('delete')}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        columns={columns}
                        //selectedRowKeys在美封装前有个点击事件获取selectedRowKeys
                        //封装后需要在封装个方法 用来跟新
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        dataSource={this.state.list}
                        pagination={false}
                        rowSelection = {'radio'}
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    //点击ok
                    onOk={this.handleSubmit}
                    width={800}
                    {...footer}
                    //关闭Modal
                    onCancel={() => {
                        //重置表单
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible: false,
                            userInfo: ''
                        })
                    }}
                >
                    {/* wrappedComponentRef类似ref功能 submit的时候好渠道表单数据*/}
                    <UserForm userInfo={this.state.userInfo} type={this.state.type} wrappedComponentRef={(inst) => this.userForm = inst} />
                </Modal>
            </div>
        )
    }
}
//表单
class UserForm extends React.Component {
    getState = (state) => {
        return {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子一枚',
            '4': '百度FE',
            '5': '创业者'
        }[state]
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const userInfo = this.props.userInfo || {};
        const type = this.props.type;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 }
        };
        return (
            <div>
                <Form layout="horizontal">
                    <FormItem label="用户名" {...formItemLayout}>
                        {
                            userInfo && type == 'detail' ? userInfo.username :
                                getFieldDecorator('user_name', {
                                    initialValue: userInfo.username
                                })(
                                    <Input type="text" placeholder="请输入用户名" />
                                )
                        }
                    </FormItem>
                    <FormItem label="性别" {...formItemLayout}>
                        {
                            userInfo && type == 'detail' ? userInfo.sex === 1 ? '男' : '女' :
                                getFieldDecorator('sex', {
                                    initialValue: userInfo.sex
                                })(
                                    <RadioGroup>
                                        <Radio value={1}>男</Radio>
                                        <Radio value={2}>女</Radio>
                                    </RadioGroup>
                                )}
                    </FormItem>
                    <FormItem label="状态" {...formItemLayout}>
                        {
                            userInfo && type == 'detail' ? this.getState(userInfo.state):
                                getFieldDecorator('state', {
                                    initialValue: userInfo.state
                                })(
                                    <Select>
                                        <Option value={1}>咸鱼一条</Option>
                                        <Option value={2}>风华浪子</Option>
                                        <Option value={3}>北大才子一枚</Option>
                                        <Option value={4}>百度FE</Option>
                                        <Option value={5}>创业者</Option>
                                    </Select>
                                )}
                    </FormItem>
                    <FormItem label="生日" {...formItemLayout}>
                        {
                            userInfo && type == 'detail' ? userInfo.birthday :
                                getFieldDecorator('birthday', {
                                    initialValue: Moment(userInfo.birthday)
                                })(
                                    <DatePicker />
                                )}
                    </FormItem>
                    <FormItem label="联系地址" {...formItemLayout}>
                        {
                            getFieldDecorator('address', {
                                initialValue: userInfo.address
                            })(
                                <Input.TextArea rows={3} placeholder="请输入联系地址" />
                            )}
                    </FormItem>
                </Form>
            </div>
        )
    }
}
UserForm = Form.create({})(UserForm);