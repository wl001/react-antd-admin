import React, { Component } from 'react'
import axios from '../../axios/index'
import Utils from '../../util/util'
import BaseForm from '../../components/BaseFrom'
import { Card, Button, Form, Input, Select, Radio, message, Modal, DatePicker } from 'antd'
export default class BikeMap extends Component {
    state = {
        bikeInfo: {}
    }
    params = {
        page: 1
    } 
    componentDidMount() {
        this.requestList();
    }
    //数据请求
    requestList = () => {
        axios.ajax({
            url: '/map/bike_list',
            data: {
                params: {
                    params: this.params
                }
            }
        }).then((res)=>{
            console.log('坐标点数据',res.result)
            if (res.code === 0) {
                this.setState({
                    total_count: res.result.total_count
                })
                this.renderMap(res.result);
            }
        })
    }
    // 表单封装，通过构建表单对象，在BaseForm中进行统一渲染
    formList = [
        {
            type: '城市'
        }, {
            type: '时间查询'
        }, {
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            placeholder: '全部',
            initialValue: '0',
            width: 150,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '3', name: '行程结束' }]
        }
    ]
    // 查询表单 接收子组件参数
    handleFilterSubmit = (filterParams) => {
        this.params = filterParams;
        this.requestList();
    };
    // 渲染地图
    renderMap = (res) => {
        let list = res.route_list;//数据
        //初始化地图 由于不是import引入不会识别成模块化会报错需要在全局查找
        this.map = new window.BMap.Map("container", { enableMapClick: false });
        let gps1 = list[0].split(',');//起点 将数据转换成数组
        let startPoint = new window.BMap.Point(gps1[0], gps1[1]);//转换成百度地图坐标
        let gps2 = list[list.length - 1].split(',');//终点
        let endPoint = new window.BMap.Point(gps2[0], gps2[1]);//转换成百度地图坐标

        this.map.centerAndZoom(endPoint, 11);//中心点

        //添加起始图标
        let startPointIcon = new window.BMap.Icon("/assets/start_point.png", new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });
        var bikeMarkerStart = new window.BMap.Marker(startPoint, { icon: startPointIcon });
        this.map.addOverlay(bikeMarkerStart);
        //添加终点图标
        let endPointIcon = new window.BMap.Icon("/assets/end_point.png", new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });
        var bikeMarkerEnd = new window.BMap.Marker(endPoint, { icon: endPointIcon });
        this.map.addOverlay(bikeMarkerEnd);

        //行驶路线
        let routeList = [];
        list.forEach((item) => {
            let p = item.split(",");
            let point = new window.BMap.Point(p[0], p[1]);
            routeList.push(point);
        })
        // 画线
        var polyLine = new window.BMap.Polyline(routeList, {
            strokeColor: "#ef4136",
            strokeWeight: 3,
            strokeOpacity: 1
        });
        this.map.addOverlay(polyLine);
        // 服务区路线
        let serviceList = res.service_list;//服务器数据坐标
        let servicePointist = [];
        serviceList.forEach((item) => {
            let point = new window.BMap.Point(item.lon, item.lat);
            servicePointist.push(point);
        })
        // 画线
        var polyServiceLine = new window.BMap.Polyline(servicePointist, {
            strokeColor: "#ef4136",
            strokeWeight: 3,
            strokeOpacity: 1
        });
        this.map.addOverlay(polyServiceLine);
        // 添加地图中的自行车
        let bikeList = res.bike_list; //自行车的坐标点数据 需要转换成数组
        let bikeIcon = new window.BMap.Icon("/assets/bike.jpg", new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });
        bikeList.forEach((item) => {
            let p = item.split(",");
            let point = new window.BMap.Point(p[0], p[1]);
            var bikeMarker = new window.BMap.Marker(point, { icon: bikeIcon });
            this.map.addOverlay(bikeMarker);
            // 添加地图控件
            this.addMapControl();
        })
    }
    // 添加地图控件
    addMapControl = () => {
        let map = this.map;
        // 左上角，添加比例尺
        var top_right_control = new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT });
        var top_right_navigation = new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT });
        //添加控件和比例尺
        map.addControl(top_right_control);
        map.addControl(top_right_navigation);
        map.enableScrollWheelZoom(true);
        // legend.addLegend(map);
    };
    render() {
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <div>共{this.state.total_count}辆车</div>
                    <div id="container" style={{ height: 500 }}></div>
                </Card>
            </div>
        );
    }
}