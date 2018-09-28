import React from 'react'
import {Form,  Input, Transfer } from 'antd'
const FormItem = Form.Item;
// 用户授权
class RoleAuthForm extends React.Component {
    //过滤 模糊查询 大于1返回true
    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1;
    };
    handleChange = (targetKeys) => {
        //当前获取的目标源targetKey保存起来然后传递到父组件patchUserInfo方法
        //然后在由父组件在传回来 单向流
        this.props.patchUserInfo(targetKeys);
    };

    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 }
        };
        const detail_info = this.props.detailInfo;
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称：" {...formItemLayout}>
                    <Input disabled maxLength={8} placeholder={detail_info.role_name} />
                </FormItem>
                <FormItem label="选择用户：" {...formItemLayout}>
                    <Transfer
                        listStyle={{ width: 200, height: 400 }}
                        dataSource={this.props.mockData}//数据源 左边穿梭框数据
                        showSearch //增加搜索功能
                        titles={['待选用户', '已选用户']}
                        searchPlaceholder='输入用户名'
                        filterOption={this.filterOption} //模糊查询功能
                        targetKeys={this.props.targetKeys}//目标源 右边穿梭框数据
                        onChange={this.handleChange}//控制数据改变否则没有效果
                        render={item => item.title}//渲染函数 否则不会显示数据
                    />
                </FormItem>
            </Form>
        )
    }
}
export default Form.create({})(RoleAuthForm);