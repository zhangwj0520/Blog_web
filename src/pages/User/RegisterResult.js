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

const RegisterResult = ({ location, history }) => {
    const phone = history.location.phone || '13912345678';
    const fullname = history.location.fullname || '管理员';
    return (
        <Result
            className={styles.registerResult}
            type="success"
            title={<div className={styles.title}>{phone}</div>}
            description={`恭喜您 ${fullname} 已经注册成功!请联系管理员开通权限!!!`}
            actions={actions}
            style={{ marginTop: 56 }}
        />
    );
};

export default RegisterResult;
