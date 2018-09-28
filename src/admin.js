import React,{Component} from 'react'
import { Row, Col} from 'antd';
import  './style/common.less'
import Header from './components/Header'
import NavLeft from './components/NavLeft'
import Footer from './components/Footer'
export default class Admin extends Component{
    componentDidMount(){
        let wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var content = document.getElementById('contene_')
        content.style.height = (wh - 105) + 'px'
    }
    render(){
        return ( 
            <div >
                <Row className='container'>
                    <Col  span={4} className='nav-left'>
                        <NavLeft></NavLeft>
                    </Col>
                    <Col span={20} className='main'>
                        <Header></Header>
                        <Row className='content' id='contene_'>
                            {/* 容器组件 包裹加载路由页面*/}
                            {this.props.children}
                        </Row>
                        {/* <Footer></Footer> */}
                    </Col>
                </Row>
            </div>
        )
    }
}