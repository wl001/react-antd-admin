import React, { Component } from 'react'
import { Card, Table, Modal, Button, message } from 'antd';
import axios from './../../axios/index'
export default class BasicTable extends Component {
    state = {
        dataSource: [],
        loading: false,
        selectRowKeys: '',
        selectedItme: {}
    }
    componentDidMount() {
        this.request();
    }
    //请求表格数据
    request = () => {
        axios.ajax({
            url: '/table/list',
            data: {
                parame: {
                    page: 1
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                res.result.map((item, index) => {
                  return  item.key = index;
                })
                this.setState({
                    dataSource: res.result,
                    selectedRowKeys: [],//删除数据后checkbox还是选中状态需要清空
                    selectedRows: null,//删除数据后checkbox还是选中状态需要清空
                })
            }
        })
    }
    // 多选执行删除动作
    handleDelete = (() => {
        let rows = this.state.selectedRows;
        if (rows == null){
            Modal.info({
                title: '信息',
                content: '请选择一条订单进行结束'
            })
            return;
        }else{
            let ids = [];
            rows.map((item) => {
                return ids.push(item.id)
            })
            Modal.confirm({
                title: '删除提示',
                content: `您确定要删除这些数据吗？${ids.join(',')}`,
                onOk: () => {
                    message.success('删除成功');
                    this.request();
                }
            })
        }
        
    })
    render() {
        //列表头内容
        const columns = [
            {
                title: 'id',
                key: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                key: 'userName',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子',
                        '4': '百度FE',
                        '5': '创业者'
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                key: 'interest',
                dataIndex: 'interest',
                render(abc) {
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
                    return config[abc];
                }
            },
            {
                title: '生日',
                key: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'address',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                key: 'time',
                dataIndex: 'time'
            }
        ]
        const selectedRowKeys = this.state.selectedRowKeys;
        // 设置单选还是多选  
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,//单选点击行选中radio
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,//必须的 当前选中行
                    selectedRows, //所有数据 可以map遍历选中其中数据进行删除
                })
            }
        }
        return (
            <div>
                <div style={{ marginBottom: 10 }}>
                    <Button onClick={this.handleDelete}>删除</Button>
                </div>
                {/* 
                    rowSelection 定义列表是否可选 
                    selectedRowKeys 指定选中项的key数组，需要和 onChange 进行配合
                    onRow 设置操作行事件
                */}
                <Card title="多选表格-mock">
                    <Table
                        rowSelection={rowCheckSelection}
                        bordered
                        size='small'
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={true}
                    />
                </Card>
            </div>
        )
    }
}