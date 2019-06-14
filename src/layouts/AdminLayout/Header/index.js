/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-31 16:05:05
 * @LastEditTime: 2019-06-03 14:16:09
 * @Description:
 **/
import React from 'react';
import { Col, Layout, Row } from 'antd';

import MyIcon from '../../../components/MyIcon';
import styles from './index.less';
import RightContent from './RightContent';

const { Header } = Layout;

export default function index({ collapsed, visible, toggleCollapsed, showDrawer, onHeaderMenuClick }) {
    return (
        <Header className="header">
            <Row>
                <Col xs={2} sm={2} md={0}>
                    <div className={styles.logo} id="logo">
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo" />
                    </div>
                </Col>
                <Col xs={0} sm={0} md={2}>
                    <MyIcon
                        type={collapsed ? 'icon-menu-fold' : 'icon-menu-unfold'}
                        onClick={toggleCollapsed}
                        style={{ fontSize: 20, marginLeft: 20, marginTop: 24 }}
                    />
                </Col>
                <Col xs={2} sm={2} md={0}>
                    <MyIcon
                        type={visible ? 'icon-menu-unfold' : 'icon-menu-fold'}
                        onClick={showDrawer}
                        style={{ fontSize: 20, marginLeft: 20, marginTop: 24 }}
                    />
                </Col>
                <Col>
                    <RightContent onHeaderMenuClick={onHeaderMenuClick} />
                </Col>
            </Row>
        </Header>
    );
}
