import React from 'react'
import { Card, Carousel } from 'antd'
import './ui.less'
export default class Carousels extends React.Component {
    render() {
        return (
            <div>
                <Card title="文字背景轮播" className="card-wrap">
                    <Carousel draggable autoplay effect="fade">
                        <div><h3>Ant Motion Banner - React</h3></div>
                        <div><h3>Ant Motion Banner - Vue</h3></div>
                        <div><h3>Ant Motion Banner - Angular</h3></div>
                    </Carousel>
                </Card>
                <Card title="图片轮播" className="slider-wrap">
                    {/* draggable 启动鼠标拖动
                        pauseOnHover 鼠标悬浮暂停切换
                    */}
                    <Carousel autoplay effect="fade"  draggable='true' pauseOnHover='true'>
                        <div>
                            <img className='slideImg' src="/carousel-img/carousel-1.jpg" alt="" />
                        </div>
                        <div>
                            <img className='slideImg' src="/carousel-img/carousel-2.jpg" alt="" />
                        </div>
                        <div>
                            <img className='slideImg' src="/carousel-img/carousel-3.jpg" alt="" />
                        </div>
                    </Carousel>
                </Card>
            </div>
        );
    }
}