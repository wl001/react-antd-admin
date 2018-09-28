import React, { Component } from 'react'
import { Row } from 'antd';
import Header from './components/Header'
import './style/common.less'
export default class Common extends Component {
    render() {
        return (
            <div >
                <Row className="simple-page">
                    <Header menuType='second'></Header>
                </Row>
                <Row className="content">
                    {/* 容器组件 包裹加载路由页面*/}
                    {this.props.children}
                </Row>
            
            </div>
        )
    }
}