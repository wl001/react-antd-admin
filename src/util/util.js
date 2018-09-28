import React from 'react';
import { Select } from 'antd'
const Option = Select.Option;
export default {
    //转换时间戳
    formateDate(time) {
        if (!time) return '';
        let date = new Date(time);
        var m = date.getMonth() + 1
        m = m < 10 ? (m = '0' + m) : m;
        var d = date.getDate()
        d = d < 10 ? (d = '0' + d) : d ;
        var h = date.getHours();
        h = h < 10 ? (h = '0' + h) : h ;
        var mm = date.getMinutes();
        mm = mm < 10 ? (mm = '0' + mm) : mm ;
        var s = date.getSeconds();
        s = s < 10 ? (s = '0' + s) : s ;
        return date.getFullYear() + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
    },
    //封装分页  点击下一页触发callback
    pagination(data, callback) {
        return {
            //切换页码 current当前页
            onChange: (current) => {
                callback(current)
            },
            current: data.result.page,//第几页
            pageSize: data.result.page_size,
            total: data.result.total,
            showTotal: () => {
                return `共${data.result.total}条`
            },
            showQuickJumper: true//是否快速跳转到某页
        }
    },
    //表单封装中的下拉框select
    getOptionList(data) {
        if (!data) {
            return [];
        }
        let options = [] //[<Option value="0" key="all_key">全部</Option>];
        data.map((item) => {
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    },
    /**
     * 对 selectedRowKeys进行封装
     * ETable 行点击通用函数
     * @param {*选中行的索引} selectedRowKeys
     * @param {*选中行对象} selectedItem
     */
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
        if (selectedIds) {//如果有值就是复选否则就是单选
            this.setState({
                selectedRowKeys,
                selectedIds: selectedIds,
                selectedItem: selectedRows
            })
        } else {
            this.setState({
                selectedRowKeys,
                selectedItem: selectedRows
            })
        }
    },
    // 格式化金额,单位:分(eg:430分=4.30元)
    formatFee(fee, suffix = '') {
        if (!fee) {
            return 0;
        }
        return Number(fee).toFixed(2) + suffix;
    },
    // 格式化公里（eg:3000 = 3公里）
    formatMileage(mileage, text) {
        if (!mileage) {
            return 0;
        }
        if (mileage >= 1000) {
            text = text || " km";
            return Math.floor(mileage / 100) / 10 + text;
        } else {
            text = text || " m";
            return mileage + text;
        }
    },
    // 隐藏手机号中间4位
    formatPhone(phone) {
        phone += '';
        return phone.replace(/(\d{3})\d*(\d{4})/g, '$1***$2')
    },
    // 隐藏身份证号中11位
    formatIdentity(number) {
        number += '';
        return number.replace(/(\d{3})\d*(\d{4})/g, '$1***********$2')
    },
}