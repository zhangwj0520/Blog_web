/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-30 19:00:03
 * @LastEditTime: 2019-05-31 13:34:21
 * @Description:
 **/
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

import adminRouter from '../../../routes/admin';
import MyIcon from '../../../components/MyIcon';
import styles from './index.module.less';

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

const BaseMenu = ({ theme }) => {
    return (
        <Menu theme={theme} mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
            {generateMenu(adminRouter)}
        </Menu>
    );
};
export default BaseMenu;
