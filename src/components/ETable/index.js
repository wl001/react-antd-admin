import React from 'react'
import {Table} from 'antd'
import  "./index.less"
export default class ETable extends React.Component {

    state = {}
    //处理行点击事件
    onRowClick = (record, index) => {
        //父组件当前是单选还是复选
        let rowSelection = this.props.rowSelection;
        if(rowSelection == 'checkbox'){
            let selectedRowKeys = this.props.selectedRowKeys;
            let selectedIds = this.props.selectedIds;
            let selectedItem = this.props.selectedItem || [];
            //判断多选是否有值
            if (selectedIds) {
                const i = selectedIds.indexOf(record.id);
                if (i == -1) {//避免重复添加
                    selectedIds.push(record.id)
                    selectedRowKeys.push(index);
                    selectedItem.push(record);
                }else{
                    selectedIds.splice(i,1);
                    selectedRowKeys.splice(i,1);
                    selectedItem.splice(i,1);
                }
            } else {
                selectedIds = [record.id];
                selectedRowKeys = [index]
                selectedItem = [record];
            }
            this.props.updateSelectedItem(selectedRowKeys,selectedItem || {},selectedIds);
        }else{
            let selectKey = [index];
            const selectedRowKeys = this.props.selectedRowKeys;
            if (selectedRowKeys && selectedRowKeys[0] == index){
                return;
            }
            //触发父组件方法 传递当前行数据和当前选择的行
            this.props.updateSelectedItem(selectKey,record || {});
        }
    };

    // 选择框变更
    onSelectChange = (selectedRowKeys, selectedRows) => {
        let rowSelection = this.props.rowSelection;
        const selectedIds = [];
        if(rowSelection == 'checkbox'){
            selectedRows.map((item)=>{
                selectedIds.push(item.id);
            });
            this.setState({
                selectedRowKeys,
                selectedIds:selectedIds,
                selectedItem: selectedRows[0]
            });
        }
        this.props.updateSelectedItem(selectedRowKeys,selectedRows[0],selectedIds);
    };

    onSelectAll = (selected, selectedRows, changeRows) => {
        let selectedIds = [];
        let selectKey = [];
        selectedRows.forEach((item,i)=> {
            selectedIds.push(item.id);
            selectKey.push(i);
        });
        this.props.updateSelectedItem(selectKey,selectedRows[0] || {},selectedIds);
    }

    getOptions = () => {
        let p = this.props;
        const name_list = {
            "订单编号":170,
            "车辆编号":80,
            "手机号码":96,
            "用户姓名":70,
            "密码":70,
            "运维区域":300,
            "车型":42,
            "故障编号":76,
            "代理商编码":97,
            "角色ID":64
        };
        if (p.columns && p.columns.length > 0) {
            p.columns.forEach((item)=> {
                //开始/结束 时间
                if(!item.title){
                    return
                }
                if(!item.width){
                    if(item.title.indexOf("时间") > -1 && item.title.indexOf("持续时间") < 0){
                        item.width = 132
                    }else if(item.title.indexOf("图片") > -1){
                        item.width = 86
                    }else if(item.title.indexOf("权限") > -1 || item.title.indexOf("负责城市") > -1){
                        item.width = '40%';
                        item.className = "text-left";
                    }else{
                        if(name_list[item.title]){
                            item.width = name_list[item.title];
                        }
                    }
                }
                item.bordered = true;
            });
        }
        //接受外层传递的 selectedRowKeys
        const { selectedRowKeys } = this.props;
         // 设置单选还是多选  
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,//点击的哪一行会把RowKeys传过来
            onChange: this.onSelectChange,
            onSelect:(record, selected, selectedRows)=>{
                console.log('...')
            },
            onSelectAll:this.onSelectAll
        };
        //接收父组件传递过来的rowSelection进行判断是什么选择 单选多选还是不选
        let row_selection = this.props.rowSelection;
        // 当属性未false或者null时，说明没有单选或者复选列
        if(row_selection===false || row_selection === null){
            row_selection = false;
        }else if(row_selection == 'checkbox'){
            //设置类型未复选框
            rowSelection.type = 'checkbox';
        }else{
            //默认未单选
            row_selection = 'radio';
        }
        return <Table 
                className="card-wrap page-table"
                bordered 
                {...this.props}
                // 单选多选还是都不要  rowSelection = {'radio'}
                rowSelection={row_selection?rowSelection:null}
                onRow={(record,index) => ({
                    onClick: ()=>{
                        //防止没有单选复选走这个click方法
                        if(!row_selection){
                            return;
                        }
                        this.onRowClick(record,index)
                    }
                  })}
            />
    };
    render = () => {
        return (
            <div>
                {this.getOptions()}
            </div>
        )
    }
}