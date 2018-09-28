import React from 'react'
import { Card } from 'antd'
//导入所有的图标会导致项目太大 需要按需引入
//import echarts from 'echarts'

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
// 引入柱形图
import 'echarts/lib/chart/bar'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
//组件化开发 避免new的形式开发
import ReactEcharts from 'echarts-for-react';

export default class Bar extends React.Component {
    state = {}
   
    getOption = ()=>{
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['OFO', '摩拜', '小蓝']
            },
            xAxis: {
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFO',
                    type: 'bar',
                    data: [2000,3000,5500,7000,8000,12000,20000]
                },
                {
                    name: '摩拜',
                    type: 'bar',
                    data: [1500,3000,4500,6000,8000,10000,15000]
                },
                {
                    name: '小蓝',
                    type: 'bar',
                    data: [1000,2000,2500,4000,6000,7000,8000]
                },
            ]
        }
        return option;
    }
    render() {
        return (
            <div>
                <Card title="柱形图表之一">
                    <ReactEcharts  option={this.getOption()}  notMerge={true} lazyUpdate={true} style={{ height: 300 }} />
                </Card>
            </div>
        );
    }
}