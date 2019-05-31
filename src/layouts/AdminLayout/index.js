/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 13:50:04
 * @LastEditTime: 2019-05-31 13:50:13
 * @Description:
 **/
import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { BackTop, Col, Layout, Row } from 'antd';
import _ from 'lodash';

import SiderMenu from './SiderMenu';
import MyIcon from '../../components/MyIcon';

import routerData from '../../routes/routerConfig';
import styles from './style.module.less';
const { Content, Header } = Layout;
@withRouter
class UserLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '管理系统',
            isHome: false,
            theme: 'light', //主题
            collapsed: false, //collapsed
            visible: false
        };
    }
    static getDerivedStateFromProps(props, state) {
        const {
            location: { pathname }
        } = props;
        const res = _.find(routerData, { pathname });
        let title = res ? res.title : '';
        let isHome = title === '首页';
        return { title, isHome };
    }

    changeTheme = value => {
        this.setState({
            theme: value ? 'dark' : 'light'
        });
    };

    //pc导航
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };
    //Mobile 抽屉
    showDrawer = () => {
        this.setState({
            visible: true
        });
    };

    onClose = () => {
        this.setState({
            visible: false
        });
    };

    componentDidMount() {}

    render() {
        const { title, theme, collapsed, visible } = this.state;
        console.log(this.props);

        return (
            <DocumentTitle title={title ? `管理系统-${title}` : '管理系统'}>
                <Layout style={{ minHeight: '100vh' }}>
                    <BackTop />
                    <Layout>
                        <SiderMenu
                            theme={theme}
                            collapsed={collapsed}
                            handleChangeTheme={this.changeTheme}
                            visible={visible}
                            onClose={this.onClose}
                        />

                        <Layout>
                            <Header className={styles.header}>
                                <Row>
                                    <Col xs={2} sm={0}>
                                        <div className={styles.logo} id="logo">
                                            <img
                                                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                                                alt="logo"
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={0} sm={2}>
                                        <MyIcon
                                            type={collapsed ? 'icon-menu-fold' : 'icon-menu-unfold'}
                                            onClick={this.toggleCollapsed}
                                            style={{ fontSize: 20, marginLeft: 20, marginTop: 24 }}
                                        />
                                    </Col>
                                    <Col xs={2} sm={0}>
                                        <MyIcon
                                            type={visible ? 'icon-menu-unfold' : 'icon-menu-fold'}
                                            onClick={this.showDrawer}
                                            style={{ fontSize: 20, marginLeft: 20, marginTop: 24 }}
                                        />
                                    </Col>
                                </Row>
                            </Header>
                            <Content
                                style={{
                                    margin: '24px 16px',
                                    padding: 24,
                                    background: '#fff',
                                    minHeight: 280
                                }}>
                                Content
                                <Switch>
                                    {routerData.map((item, index) => {
                                        return item.component ? (
                                            <Route
                                                key={index}
                                                path={item.pathname}
                                                component={item.component}
                                                exact={item.exact}
                                            />
                                        ) : null;
                                    })}
                                </Switch>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </DocumentTitle>
        );
    }
}

export default UserLayout;
