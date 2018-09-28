import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router'
//获取store的数据源对象 提供数据源 
import { Provider } from 'react-redux';
//引入数据源
import configStore from './redux/store'

const store = configStore()
window._store = store; //_store.getState()

ReactDOM.render(
    //提供数据源  这样所有的组件都可以拿到数据源了
    <Provider store={store}>
                <Router />
        </Provider>, document.getElementById('root'));