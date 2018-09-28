import React from 'react'
import {  Form,  Input, Select, Tree } from 'antd'

import menuConfig from '../../config/menuConfig'
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
// 设置权限
class PermEditForm extends React.Component {
    state = {};
    // 设置选中的节点，通过父组件方法再传递回来
    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys);
    };
    // data是menuConfig  遍历date得到tree的数据
    renderTreeNodes = (data) => {
        return data.map((item) => {
            //如果有节点继续递归遍历
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} className="op-role-tree">
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            } else{
                return <TreeNode {...item} />;
            }
        });
    };

    renderBtnTreedNode = (menu, parentKey = '') => {
        const btnTreeNode = []
        menu.btnList.forEach((item) => {
            console.log(parentKey + '-btn-' + item.key);
            btnTreeNode.push(<TreeNode title={item.title} key={parentKey + '-btn-' + item.key} className="op-role-tree" />);
        })
        return btnTreeNode;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 }
        };
        const detail_info = this.props.detailInfo;
        const menuInfo = this.props.menuInfo;
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称：" {...formItemLayout}>
                    <Input disabled maxLength="8" placeholder={detail_info.role_name} />
                </FormItem>
                <FormItem label="状态：" {...formItemLayout}>
                    {getFieldDecorator('status', {
                        initialValue: '1'
                    })(
                        <Select style={{ width: 80 }}
                            placeholder="启用"
                        >
                            <Option value="1">启用</Option>
                            <Option value="0">停用</Option>
                        </Select>
                    )}
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    //每次勾选的时候会保存权限交给后台
                    onCheck={(checkedKeys) => this.onCheck(checkedKeys)}
                    //默认显示
                    checkedKeys={menuInfo || []}
                >
                    <TreeNode title="平台权限" key="platform_all">
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}

export default Form.create({})(PermEditForm);