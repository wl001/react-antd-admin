import React, { Component }  from 'react'
import { Card, Table } from 'antd';
import axios from './../../axios/index'
export default class BasicTable extends Component {
    state = {
        dataSource:[],
        loading: false,
    }
    componentDidMount() {
        this.request();
    }
    request = () => {
        axios.ajax({
            url: '/table/list',
        }).then((res)=>{
            if (res.code === 0) {
                res.result.map((item, index) => {
                   return  item.key = index;
                })
                this.setState({
                    dataSource: res.result
                })
            }
        })
    }
    // request = ()=>{
    //     let baseUrl = 'https://www.easy-mock.com/mock/5b922aea782c561fa9e4ba6c/mockapi';
    //     axios.get(baseUrl + '/table/list').then((res)=>{
    //         if (res.status == '200'){
    //             let data = res.data.result;
    //             data.map((item, index) => {
    //                 item.key = index
    //             })
    //             console.log(data)
    //             this.setState({
    //                 dataSource: data
    //             })
    //         }   
    //     })
    // }
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
        return (
            <div>
                <Card title="动态数据渲染表格">
                    <Table
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