/*
 引入createStore 是用来创建一个数据源对象保存我们的数据的

*/
//相当于创建工厂
import { createStore } from 'redux';
//引用数据源  store是引用的reducer，action会触发reducer，三者关系很密切
import reducer from './../reducer'

//数据处理后会返回给数据源 才能取到最新的数据  在根组件index里获取
export default () => createStore(reducer)