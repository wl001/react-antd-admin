import React, { Component } from 'react'
import { Card, Table } from 'antd';
import axios from './../../axios/index'
export default class BasicTable extends Component {
    state = {
        dataSource: [],
        loading: false,
    }
    componentDidMount() {
        this.request();
    }
    request = () => {
        axios.ajax({
            url: '/table/list',

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
    handleChange = (pagination, filters, sorter) => {
        console.log("::" + sorter)
        this.setState({
            sortOrder: sorter.order
        })
    }
    render() {
        //列表头内容
        const columns = [
            {
                title: 'id',
                width:50,
                align:'center',//文字居中
                fixed:'left',//固定列
                key: 'id',
                dataIndex: 'id',
                //本地排序 sorter sortOrder
                sorter:(a,b)=>{ 
                    return a.id - b.id
                },
                sortOrder: this.state.sortOrder
            },
            {
                title: '用户名',
                width: 100,
                align: 'center',//文字居中
                key: 'userName',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                key: 'sex',
                width: 100,
                align: 'center',//文字居中
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                key: 'state',
                width: 150,
                align: 'center',//文字居中
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
                width: 150,
                align: 'center',//文字居中
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
                width: 150,
                align: 'center',//文字居中
                key: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                width: 200,
                align: 'center',//文字居中
                key: 'address',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                width: 200,
                 align: 'center',//文字居中
                key: 'time',
                dataIndex: 'time'
            }
        ]
        return (
            <div>
                <Card title="固定排序表格">
                    <Table
                        scroll={{ x: 1100,y : 240}} //固定表头内容滚动 但是要设置每列宽度
                        bordered
                        size='small'
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        // 分页、排序、筛选变化时触发
                        onChange = {this.handleChange}
                />
                </Card>
            </div>
        )
    }
}