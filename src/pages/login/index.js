import React, { Component } from 'react';
import { Button, Form, Input, Icon} from 'antd'
import menuConfig from '../../config/menuConfig'
import './index.less'
const FormItem = Form.Item;



export default class Login extends Component {
   
loginReq = (params) => {
    console.log(params)
    window.location.href = '/#/';
};
    render() {
        return (
            <div className="login-page">
                <div className="login-header">
                    <div className="logo">
                        <img src="/assets/logo-ant.svg" alt="慕课后台管理系统" />
                        React全家桶+AntD 共享经济热门项目后台管理系统
                    </div>
                    <div className="login-content-wrap">
                        <div className="login-content">
                            <div className="word">共享出行 <br />引领城市新经济</div>
                            <div className="login-box">
                                <div className="error-msg-wrap">
                                    <div>
                                        {/*className={this.state.errorMsg ? "show" : ""}>
                                        {this.state.errorMsg} /> */}
                                    </div>
                                </div>  
                                <LoginForm  ref="login" loginSubmit={this.loginReq} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }      
}
class LoginForm extends React.Component {
    state = {};

    loginSubmit = (e) => {
        e && e.preventDefault();
        const _this = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var formValue = _this.props.form.getFieldsValue();
                _this.props.loginSubmit({
                    username: formValue.username,
                    password: formValue.password
                });
            }
        });
    };

    checkUsername = (rule, value, callback) => {
        var reg = /^\w+$/;
        if (!value) {
            callback('请输入用户名!');
        } else if (!reg.test(value)) {
            callback('用户名只允许输入英文字母');
        } else {
            callback();
        }
    };

    checkPassword = (rule, value, callback) => {
        if (!value) {
            callback('请输入密码!');
        } else {
            callback();
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 20
            }
        }
        return (
            <Form className="login-form">
                <FormItem label="用户名"  {...formItemLayout}>
                    {getFieldDecorator('username', {
                        initialValue: 'admin',
                        rules: [{ validator: this.checkUsername }]
                    })(
                        <Input prefix={<Icon type="user" />} placeholder="用户名" />
                    )}
                </FormItem>
                <FormItem label="密码" {...formItemLayout}> 
                    {getFieldDecorator('password', {
                        initialValue: 'admin',
                        rules: [{ validator: this.checkPassword }]
                    })(
                        <Input prefix={<Icon type="lock" />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" onClick={this.loginSubmit} className="login-form-button">
                        登录
                    </Button>
                </FormItem>
            </Form>
        )
    }
}
LoginForm = Form.create({})(LoginForm);