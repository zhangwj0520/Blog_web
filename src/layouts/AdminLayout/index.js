/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 13:50:04
 * @LastEditTime: 2019-05-30 19:05:09
 * @Description:
 **/
import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { BackTop, Col, Layout, Row } from 'antd';
import _ from 'lodash';

import SiderMenu from './SiderMenu';

import routerData from '../../routes/routerConfig';
const { Content } = Layout;
@withRouter
class UserLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'MyBlog',
            isHome: false
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
    componentDidMount() {}

    render() {
        const { title, isHome } = this.state;
        console.log(this.props);

        return (
            <DocumentTitle title={title ? `管理系统-${title}` : '管理系统'}>
                <Layout style={{ minHeight: '100vh' }}>
                    <BackTop />
                    <Layout>
                        <SiderMenu />
                        <Content>
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
            </DocumentTitle>
        );
    }
}

export default UserLayout;
