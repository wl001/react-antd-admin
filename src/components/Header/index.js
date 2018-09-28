import React, { Component } from 'react'
import { Row, Col, Button } from "antd"
import { withRouter } from 'react-router-dom';
//通过connect（redux连接器）使react关联redux 点击的时候需要触发action 引入action
import { connect } from 'react-redux'
import './index.less'
import Util from '../../util/util'
import axios from '../../axios'
 class Header extends Component {
    state = { 
        userName: '',//用户名
        sysTime: '', //时间
        dayPictureUrl:'',//天气图片
        weather:'',//天气描述 多云转晴
    }
    componentWillMount(){
            this.setState({
                userName: '河畔一脚'
            })
            //转换时间
            setInterval(() => {
                let sysTime = Util.formateDate(new Date().getTime());
                this.setState({
                    sysTime
                })
            }, 1000)
            //百度天气API接口获取天气
            this.getWeatherAPIData(); 
    } 
     componentWillUnmount() {
         this._isMounted = false
     }
    getWeatherAPIData() {
        let city = '北京';
        axios.jsonp({
            url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res) => {
            if (res.status === 'success') {
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl: data.dayPictureUrl, 
                    weather: data.weather 
                })
            }
        })
    }
    logout = ()=>{
        this.props.history.push("/login");
    }
    render() {
        //menuType  common加载页面的header的类型
        const menuType = this.props.menuType;
        return (
            <div className='header'>
                <Row className="header-top">
                    {
                        menuType ?
                            <Col span="6" className="logo">
                                <img src="/assets/logo-ant.svg" alt="" />
                                <span>IMooc 通用管理系统</span>
                            </Col> : ''
                    }
                    <Col span={menuType ? 18 : 24}>
                        <span style={{marginRight:'15px'}}>欢迎，{this.state.userName}</span>
                        <Button onClick={this.logout} size='small' type="default" icon="logout" ></Button>
                    </Col>
                </Row>
                {
                    menuType ? '' : 
                    <Row className="breadcrumb">
                        <Col span={4} className="breadcrumb-title">
                            {this.props.menuName}
                        </Col>
                        <Col span={20} className="weather">
                            <span className="date">{this.state.sysTime}</span>
                            <span className="weather-img">
                                <img src={this.state.dayPictureUrl} alt='' />
                            </span>
                            <span className="weather-detail" >{this.state.weather}</span>
                        </Col>
                    </Row>
                }
               
            </div>
        )
    }
}
const mapStateToProps = state =>{
        console.log('redux获取state数据', state)
        return {
            menuName: state.menuName
        }   
}
export default withRouter(connect(mapStateToProps)(Header))