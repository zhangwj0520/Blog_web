/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-30 19:00:03
 * @LastEditTime: 2019-05-31 10:20:38
 * @Description:
 **/
import React, { useState, Suspense } from 'react';
import { Link } from 'react-router-dom';

import { Drawer, Row, Col, Layout, Menu, Icon } from 'antd';

import adminRouter from '../../../routes/admin';

import MyIcon from '../../../components/MyIcon';

import styles from './index.module.less';

const { Header, Sider, Content } = Layout;

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

const SiderMenu = React.memo(props => {
    const [collapsed, setCollapsed] = useState(false);
    const [theme, setTheme] = useState('light');

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div>
            <Row>
                <Col xs={0} sm={24}>
                    <Sider theme={theme} className={styles.sider} collapsible>
                        <div className={styles.logo} id="logo">
                            <Link to="/">
                                <img
                                    src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                                    alt="logo"
                                />
                                <h1>Antd</h1>
                            </Link>
                        </div>
                        <Menu
                            theme={theme}
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}>
                            {generateMenu(adminRouter)}
                        </Menu>
                    </Sider>
                </Col>
            </Row>
        </div>
    );
});

export default SiderMenu;
