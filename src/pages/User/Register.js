import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Icon, message as Message } from 'antd';
import styles from './Register.module.less';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userRigister } from './modules';

import {
    getUser
    // postCompanies,
    // getCompanies,
    // getDashs,
    // postProduct
} from '../../api/users';

const FormItem = Form.Item;

@Form.create()
class Register extends Component {
    state = {
        count: 0,
        confirmDirty: false
    };

    handleSubmit = e => {
        const { form, userRigister, history } = this.props;
        e.preventDefault();
        form.validateFields(async (err, values) => {
            if (!err) {
                const { userName, passWord, phoneNumber } = values;
                await userRigister({ userName, passWord, phoneNumber });
                console.log(this.props);
                // const {
                //     usersState: {
                //         status,
                //         message,
                //         user: { userName,passWord, phoneNumber }
                //     }
                // } = this.props;
                // if (status === 200) {
                //     Message.success(message);
                //     history.push({
                //         pathname: `/user/register-result`,
                //         phone,
                //         fullName
                //     });
                // }
            }
        });
    };
    handleGetUser = async () => {
        let a = await getUser({ username: 'admin' });
        console.log(a);
    };

    checkConfirm = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('passWord')) {
            callback('两次输入的密码不匹配!');
        } else {
            callback();
        }
    };

    checkPassword = (rule, value, callback) => {
        if (!value) {
            callback('密码不能为空');
        } else if (value.length < 6) {
            callback('密码至少6位');
        } else {
            callback();
        }
    };

    render() {
        const {
            form,
            usersState: { isLoading }
        } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 }
            }
        };
        return (
            <div className={styles.main}>
                <h3>注&nbsp;&nbsp;&nbsp;册</h3>

                <Form onSubmit={this.handleSubmit} {...formItemLayout}>
                    <FormItem hasFeedback={true} label="用户名">
                        {getFieldDecorator('userName', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入用户名'
                                }
                            ]
                        })(
                            <Input
                                prefix={
                                    <Icon
                                        type="user"
                                        style={{
                                            color: 'rgba(0,0,0,.25)',
                                            fontSize: 16
                                        }}
                                    />
                                }
                                size="large"
                                placeholder="用户名"
                            />
                        )}
                    </FormItem>
                    <FormItem hasFeedback={true} label="手机号码">
                        {getFieldDecorator('phoneNumber', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入手机号！'
                                },
                                {
                                    pattern: /^\d{11}$/,
                                    message: '手机号格式错误！'
                                }
                            ]
                        })(
                            <Input
                                prefix={
                                    <Icon
                                        type="mobile"
                                        style={{
                                            color: 'rgba(0,0,0,.25)',
                                            fontSize: 16
                                        }}
                                    />
                                }
                                size="large"
                                placeholder="手机号"
                            />
                        )}
                    </FormItem>
                    <FormItem hasFeedback={true} label="密码">
                        {getFieldDecorator('passWord', {
                            rules: [
                                {
                                    validator: this.checkPassword,
                                    required: true
                                }
                            ]
                        })(
                            <Input
                                prefix={
                                    <Icon
                                        type="lock"
                                        style={{
                                            color: 'rgba(0,0,0,.25)',
                                            fontSize: 16
                                        }}
                                    />
                                }
                                size="large"
                                type="passWord"
                                placeholder="请输入密码"
                            />
                        )}
                    </FormItem>
                    <FormItem hasFeedback={true} label="确认密码">
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: '请确认密码！'
                                },
                                {
                                    validator: this.checkConfirm
                                }
                            ]
                        })(
                            <Input
                                prefix={
                                    <Icon
                                        type="lock"
                                        style={{
                                            color: 'rgba(0,0,0,.25)',
                                            fontSize: 16
                                        }}
                                    />
                                }
                                size="large"
                                type="passWord"
                                placeholder="确认密码"
                            />
                        )}
                    </FormItem>
                    <Form.Item
                        wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 24, offset: 0 }
                        }}>
                        <Button
                            size="large"
                            loading={isLoading}
                            className={styles.submit}
                            type="primary"
                            htmlType="submit">
                            注册
                        </Button>
                    </Form.Item>

                    <FormItem />
                </Form>
                <div className={styles.login}>
                    已有账户 <Link to="/user/login">登录</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        usersState: state.users.userRigisterReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({ userRigister }, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
