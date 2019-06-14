import React, { Component, Suspense } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { BackTop, Layout } from 'antd';
import _ from 'lodash';

import SiderMenu from './SiderMenu';
import Header from './Header';

import routerData from '../../routes/routerConfig';
import styles from './style.module.less';

import { reduxRouter } from '../../common/utils';
const { Content } = Layout;

const Footer = React.lazy(() => import('./Footer'));

@withRouter
class UserLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '管理系统',
            isHome: false,
            theme: 'light', //主题
            collapsed: false, //collapsed
            visible: false,
            token: '',
            width: '200px'
        };
    }
    static getDerivedStateFromProps(props, state) {
        const {
            location: { pathname }
        } = props;
        const token = localStorage.Token;
        const res = _.find(routerData, { pathname });
        let title = res ? res.title : '';
        let isHome = title === '首页';
        return { title, isHome, token };
    }
    componentDidMount() {
        const { token } = this.state;
        if (!token) {
            reduxRouter('/user/login');
        }
    }

    changeTheme = value => {
        this.setState({
            theme: value ? 'dark' : 'light'
        });
    };

    onHeaderMenuClick = ({ key }) => {
        const { history } = this.props;
        if (key === 'userCenter') {
            history.push('/account/center');
            return;
        }
        if (key === 'triggerError') {
            history.push('/exception/trigger');
            return;
        }
        if (key === 'userinfo') {
            history.push('/account/settings/base');
            return;
        }
        if (key === 'logout') {
            localStorage.clear();
            history.push('/');
        }
    };
    //pc导航
    toggleCollapsed = () => {
        const { collapsed } = this.state;
        let width = collapsed ? '200px' : '80px';
        this.setState({
            collapsed: !collapsed,
            width
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

    render() {
        const { title, theme, collapsed, visible, width } = this.state;

        return (
            <DocumentTitle title={title ? `管理系统-${title}` : '管理系统'}>
                <Layout style={{ maxHeight: '100vh' }}>
                    <SiderMenu
                        theme={theme}
                        collapsed={collapsed}
                        handleChangeTheme={this.changeTheme}
                        visible={visible}
                        onClose={this.onClose}
                        width={width}
                    />

                    <Layout>
                        <Header
                            collapsed={collapsed}
                            visible={visible}
                            toggleCollapsed={this.toggleCollapsed}
                            showDrawer={this.showDrawer}
                            onHeaderMenuClick={this.onHeaderMenuClick}
                            style={{ position: 'absolute' }}
                        />

                        <Content className={styles.content}>
                            <Switch>
                                {routerData.map((item, index) => {
                                    return (
                                        <Route
                                            key={index}
                                            path={item.pathname}
                                            component={item.component}
                                            exact={item.exact}
                                        />
                                    );
                                })}
                            </Switch>

                            <Suspense fallback={null}>
                                <Footer />
                            </Suspense>
                        </Content>
                    </Layout>
                    <BackTop />
                </Layout>
            </DocumentTitle>
        );
    }
}

export default UserLayout;
