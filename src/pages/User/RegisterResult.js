import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import Result from '../../components/Result';
import styles from './RegisterResult.module.less';

const actions = (
    <div className={styles.actions}>
        <Link to="/user/register">
            <Button size="large">返回</Button>
        </Link>
        <Link to="/user/login">
            <Button size="large" type="primary">
                登录
            </Button>
        </Link>
    </div>
);

const RegisterResult = ({ location: { userName, phoneNumber } }) => {
    return (
        <Result
            className={styles.registerResult}
            type="success"
            title={
                <div>
                    <div className={styles.title}>用户名:{userName}</div>
                    <div className={styles.title}>手机号码:{phoneNumber}</div>
                </div>
            }
            description={`恭喜您 ${userName} 已经注册成功!请联系管理员开通权限!!!`}
            actions={actions}
            style={{ marginTop: 56 }}
        />
    );
};

export default RegisterResult;
