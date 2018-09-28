import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom'
import App from './App'
import Admin from './admin' //主体结构 layout左右布局
import Login from './pages/login'
import Home from './pages/home'
import Buttons from './pages/ui/button'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Notice from './pages/ui/notice'
import Messages from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousel'
import Menu from './pages/ui/menu'
import FormLogin from './pages/form/login'
import FormRegister from './pages/form/register'
import Table from './pages/table/basic'
import DynamicTable from './pages/table/dynamicTable'
import RedioTable from './pages/table/radioTable.js'
import CheckTable from './pages/table/checkTable.js'
import PagingTable from './pages/table/pagingTable.js'
import HighTable from './pages/table/highTable'
import CustomTable from './pages/table/customTable'
import Rich from './pages/rich'
import City from './pages/city/city'
import Order from './pages/order/index'
import Common from './common'
import OrderDetail from './pages/order/detail'
import User from './pages/user/index'
import BikeMap from './pages/map/bikeMap'
import Bar from './pages/echarts/bar'
import Line from './pages/echarts/line'
import Permission from './pages/permission'

export default class IRouter extends Component {
    render() {
        return (
            <Router>
                <App>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/common"  render={() =>
                            <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                            </Common>
                        }
                        />
                        <Route  path="/" render={() =>(
                            <Admin >
                                <Switch> 
                                    <Route path='/home' component={Home} />
                                    <Route path="/ui/buttons" component={Buttons} />
                                    <Route path="/ui/modals" component={Modals} />
                                    <Route path="/ui/loadings" component={Loadings} />
                                    <Route path="/ui/notification" component={Notice} />
                                    <Route path="/ui/messages" component={Messages} />
                                    <Route path="/ui/tabs" component={Tabs} />
                                    <Route path="/ui/gallery" component={Gallery} />
                                    <Route path="/ui/carousel" component={Carousel} />
                                    <Route path="/ui/menu" component={Menu} />
                                    <Route path="/form/login" component={FormLogin} />
                                    <Route path="/form/reg" component={FormRegister} />
                                    <Route path="/table/table" component={Table} />
                                    <Route path="/table/dynamic" component={DynamicTable} />
                                    <Route path="/table/redioTable" component={RedioTable} />
                                    <Route path="/table/checkTable" component={CheckTable} />
                                    <Route path="/table/pagingTable" component={PagingTable} />
                                    <Route path="/table/highTable" component={HighTable} />
                                    <Route path="/table/customTable" component={CustomTable} />
                                    <Route path='/rich' component={Rich} />
                                    <Route path="/city" component={City} />
                                    <Route path="/order" component={Order} />
                                    <Route path="/user" component={User} />
                                    <Route path='/bikeMap' component={BikeMap} />
                                    <Route path="/charts/bar" component={Bar} />
                                    <Route path="/charts/line" component={Line} />
                                    <Route path="/charts/line" component={Line} />
                                    <Route path="/permission" component={Permission} />
                                    {/* Redirect放在最后 匹配不到在重定向 放在第一个不会加载其余路由 */}
                                    <Redirect to='/home' />
                                </Switch>
                            </Admin>     
                        )}
                        />
                    </Switch>
                </App>
            </Router>
        )
    }
}