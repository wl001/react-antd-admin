import JsonP from 'jsonp'
import axios from 'axios'
import Utils from '../util/util'
import { Modal } from 'antd'
export default class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, { 
                param: 'callback'
            }, function (err, response) {
                if (response.status === 'success') {
                    resolve(response);
                } else {
                    reject(response.messsage);
                }
            })
        })
    }
    static ajax(options) {
        //显示loading
        let loading;
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        //判断是否是mock数据 否则掉后台接口
        let baseApi=''
        if (options.isMock){
            baseApi = 'https://www.easy-mock.com/mock/5b922aea782c561fa9e4ba6c/mockapi';
        }else{
            baseApi = 'https://www.easy-mock.com/mock/5b922aea782c561fa9e4ba6c/mockapi';
        }
       
        return new Promise((resolve,reject)=>{
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                params: (options.data && options.data.params) || ''
            }).then((response)=>{
                //关闭loading
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status == '200') {
                    let res = response.data;
                    if (res.code == '0') {
                        resolve(res);
                    } else {
                        Modal.info({
                            title: "提示",
                            content: res.msg
                        })
                    }
                } else {
                    reject(response.data);
                }
            }).catch((err)=>{
                console.log(err)
            })
        })
    }
    /*
    封装请求列表
    axios.requestList(this,'/table/userList',this.params)
    */
    static requestList(_this,url,params,isMock) {
        var data = {
            params: params,
            isMock
        }
        this.ajax({
            url,
            data
        }).then((data)=>{
            if (data && data.result){
                let list = data.result.item_list.map((item, index) => {
                    item.key = index;//数据都要有key属性郑家自定义key
                    return item;
                })
                _this.setState({
                    list,
                    pagination: Utils.pagination(data, (current) => {
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        })
    }
}