import React from 'react';
import {Layout, BackTop} from 'antd';
import {withRouter} from 'react-router-dom';
import Media from 'react-media';
import DocumentTitle from 'react-document-title';
import {ContainerQuery} from 'react-container-query';
import classNames from 'classnames';

import getPageTitle from '../../utils/getPageTitle';
import Context from './MenuContext';

import Header from './components/Header';
import SiderMenu from './components/SiderMenu';
import Footer from './components/Footer';
import MainRoutes from './MainRoutes';

import styles from './index.module.less';

import BasicLayoutHoc from './BasicLayoutHoc';

const {Content} = Layout;
const query = {
    'screen-xs': {
        maxWidth: 575
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199
    },
    'screen-xl': {
        minWidth: 1200,
        maxWidth: 1599
    },
    'screen-xxl': {
        minWidth: 1600
    }
};

@withRouter
@BasicLayoutHoc
class BasicLayout extends React.Component {
    state = {
        collapsed: false
    };
    componentDidMount() {
        const reactToken = localStorage.getItem('reactToken');
        if (!reactToken) {
            this.props.history.push('/user/login');
        }
    }

    onHeaderMenuClick = ({key}) => {
        const {history} = this.props;
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
            history.push('/user/login');
        }
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    onCollapse = collapsed => {
        this.setState({collapsed});
    };
    getContext() {
        const {location, breadcrumbNameMap} = this.props;
        return {
            location,
            breadcrumbNameMap
        };
    }

    render() {
        const {
            isMobile,
            location: {pathname}
        } = this.props;
        const {collapsed} = this.state;
        const title = getPageTitle(pathname) ? getPageTitle(pathname).title : 'title';

        return (
            <React.Fragment>
                <DocumentTitle title={title}>
                    <ContainerQuery query={query}>
                        {params => (
                            <Context.Provider value={this.getContext()}>
                                <div className={classNames(params)}>
                                    <Layout>
                                        <SiderMenu
                                            isMobile={isMobile}
                                            collapsed={collapsed}
                                            onCollapse={this.onCollapse}
                                        />
                                        <Layout style={{minHeight: '100vh'}}>
                                            <Header
                                                isMobile={isMobile}
                                                collapsed={collapsed}
                                                onCollapse={this.onCollapse}
                                                onHeaderMenuClick={this.onHeaderMenuClick}
                                            />
                                            <Content className={styles.content}>
                                                <BackTop />
                                                <MainRoutes />
                                            </Content>
                                            <Footer />
                                        </Layout>
                                    </Layout>
                                </div>
                            </Context.Provider>
                        )}
                    </ContainerQuery>
                </DocumentTitle>
            </React.Fragment>
        );
    }
}

export default props => (
    <Media query="(max-width: 599px)">{isMobile => <BasicLayout {...props} isMobile={isMobile} />}</Media>
);
