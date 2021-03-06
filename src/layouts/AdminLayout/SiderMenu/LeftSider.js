/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-30 19:00:03
 * @LastEditTime: 2019-06-03 14:44:19
 * @Description:
 **/
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Layout, Switch } from 'antd';

import adminRouter from '../../../routes/admin';
import MyIcon from '../../../components/MyIcon';
import styles from './index.module.less';

const { Sider } = Layout;

// 递归生成菜单
const generateMenu = menuList => {
    return menuList.map(item => {
        if (item.hide) return null;
        if (!item.isAuth) return null;
        return (
            <Menu.Item key={item.title} className={styles.menuItem}>
                <Link to={item.pathname || '/admin'}>
                    <MyIcon type={item.icon} />
                    <span>{item.title}</span>
                </Link>
            </Menu.Item>
        );
    });
};

const BaseMenu = ({ theme, handleChangeTheme, collapsed, drawerWidth, width, onClose }) => {
    const onClick = () => {
        onClose && onClose();
    };
    return (
        <Sider
            theme={theme}
            className={styles.sider}
            collapsed={collapsed}
            trigger={null}
            collapsible
            width={drawerWidth}>
            <div className={styles.logo} id="logo">
                <Link to="/">
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo" />
                    <h1>Antd</h1>
                </Link>
            </div>
            <div className={styles.changeTheme} style={{ width: width }}>
                <Switch
                    checked={theme === 'dark'}
                    onChange={handleChangeTheme}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                />
            </div>
            <Menu theme={theme} mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} onClick={onClick}>
                {generateMenu(adminRouter)}
            </Menu>
        </Sider>
    );
};
export default BaseMenu;
