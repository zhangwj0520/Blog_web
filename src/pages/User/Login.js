import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, Alert, message, Icon } from 'antd';
import Login from '../../components/Login';
import styles from './Login.module.less';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userLogin } from './modules';

const { Tab, Password, Mobile, Captcha, Submit } = Login;
class LoginPage extends Component {
    state = {
        type: 'account',
        autoLogin: true
    };
    componentWillMount() {
        console.log(this.props);
    }

    onTabChange = type => {
        this.setState({ type });
    };

    onGetCaptcha = () =>
        new Promise((resolve, reject) => {
            this.loginForm.validateFields(['mobile'], {}, (err, values) => {
                if (err) {
                    reject(err);
                } else {
                    const { dispatch } = this.props;
                    dispatch({
                        type: 'login/getCaptcha',
                        payload: values.mobile
                    })
                        .then(resolve)
                        .catch(reject);
                    message.warning('此项目为演示项目，并不会真的给您发送验证码。请切换到账户密码登录界面按提示登录。');
                }
            });
        });

    handleSubmit = async (err, values) => {
        if (!err) {
            const { userLogin, history } = this.props;
            await userLogin(values);
            const {
                usersState: { success, msg }
            } = this.props;
            if (success === true) {
                history.push('/home');
                message.success('登录成功');
            } else {
                message.error(msg);
            }
        }
    };

    changeAutoLogin = e => {
        this.setState({
            autoLogin: e.target.checked
        });
    };

    renderMessage = content => <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;

    render() {
        console.log(this.props);
        const {
            usersState: { isLoading }
        } = this.props;
        const { type, autoLogin } = this.state;

        return (
            <div className={styles.main}>
                <Login
                    defaultActiveKey={type}
                    onTabChange={this.onTabChange}
                    onSubmit={this.handleSubmit}
                    ref={form => {
                        this.loginForm = form;
                    }}>
                    <Tab key="account" tab="密码登录">
                        {/* {login.status === 'error' &&
                            login.type === 'account' &&
                            !submitting &&
                            this.renderMessage(
                                '账户或密码错误（admin/ant.design)'
                            )} */}
                        <Mobile
                            name="phone"
                            placeholder="手机号"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号码'
                                },
                                {
                                    pattern: /^1\d{10}$/,
                                    message: '手机号格式错误'
                                }
                            ]}
                        />
                        <Password
                            name="passWord"
                            placeholder="密码"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码'
                                }
                            ]}
                            onPressEnter={e => {
                                e.preventDefault();
                                this.loginForm.validateFields(this.handleSubmit);
                            }}
                        />
                    </Tab>
                    <Tab key="mobile" tab="短信验证码登录">
                        {/* {login.status === 'error' &&
                            login.type === 'mobile' &&
                            !submitting &&
                            this.renderMessage('验证码错误')} */}
                        <Mobile
                            name="phone"
                            placeholder="手机号"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号码'
                                },
                                {
                                    pattern: /^1\d{10}$/,
                                    message: '手机号格式错误'
                                }
                            ]}
                        />
                        <Captcha
                            name="captcha"
                            placeholder="验证码"
                            countDown={120}
                            onGetCaptcha={this.onGetCaptcha}
                            getCaptchaButtonText="获取验证码"
                            getCaptchaSecondText="秒"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入验证码！'
                                }
                            ]}
                        />
                    </Tab>
                    <div>
                        <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
                            {'自动登录'}
                        </Checkbox>
                        {/* <a style={{ float: 'right' }} href="###">
                            {'忘记密码'}
                        </a> */}
                    </div>
                    <Submit loading={isLoading}>登录</Submit>
                    <div className={styles.other}>
                        {'其他方式登录'}
                        <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
                        <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
                        <Icon type="weibo-circle" className={styles.icon} theme="outlined" />
                        <Link className={styles.register} to="/user/register">
                            注册账户
                        </Link>
                    </div>
                </Login>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        usersState: state.users.userLoginReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({ userLogin }, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
