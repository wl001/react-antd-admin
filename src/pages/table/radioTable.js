import React, { Component } from 'react'
import { Card, Table, Modal} from 'antd';
import axios from './../../axios/index'
export default class BasicTable extends Component {
    state = {
        dataSource: [],
        loading: false,
        selectRowKeys:'',
        selectedItme:{}
    }
    componentDidMount() {
        this.request();
        console.log(this.state.selectRowKeys)
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
                   return item.key = index;
                })
                this.setState({
                    dataSource: res.result
                })
            }
        })
    }
    //recode当前行数据的所有字段可以分别拿到想要的数据
    onRowClick(record,index){

        let selectKey = [index]
        this.setState({
            selectedRowKeys: selectKey,//选中的行索引
            selectedItme: record  //选中某一行的所有数据
        })
        Modal.info({
            title: '信息',
            content: `用户名：${record.userName},用户爱好：${record.interest}`
        })
    }

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
        const rowSelection = {
            type: 'radio',
            selectedRowKeys //单选点击行选中radio
        }
        return (
            <div>
                {/* 
                    rowSelection 定义列表是否可选 
                    selectedRowKeys 指定选中项的key数组，需要和 onChange 进行配合
                    onRow 设置操作行事件
                */}
                <Card title="单选表格-mock">
                    <Table
                        rowSelection={rowSelection}
                        bordered
                        size='small'
                        columns={columns}                      
                        pagination={true}
                        dataSource={this.state.dataSource}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                    />
                </Card>
            </div>
        )
    }
}