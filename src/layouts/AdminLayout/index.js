/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 13:50:04
 * @LastEditTime: 2019-05-31 16:23:42
 * @Description:
 **/
import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { BackTop, Col, Layout, Row } from 'antd';
import _ from 'lodash';

import SiderMenu from './SiderMenu';
import Header from './Header';
import Footer from '../BasicLayout/Footer';

import routerData from '../../routes/routerConfig';
import styles from './style.module.less';
const { Content } = Layout;

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
        // console.log(this.props);

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
                            <Header
                                collapsed={collapsed}
                                visible={visible}
                                toggleCollapsed={this.toggleCollapsed}
                                showDrawer={this.showDrawer}
                            />

                            <Content className={styles.content}>
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
                            <Footer />
                        </Layout>
                    </Layout>
                </Layout>
            </DocumentTitle>
        );
    }
}

export default UserLayout;
