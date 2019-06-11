/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 13:50:04
 * @LastEditTime: 2019-05-30 09:43:45
 * @Description:
 **/
import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { BackTop, Col, Layout, Row } from 'antd';
import _ from 'lodash';
import routerData from '../../routes/routerConfig';
import Footer from './Footer';
import Header from './Header';
import NavSide from './NavSide';
import Banner from './Banner';
import Breadcrumb from './Breadcrumb';

import styles from './index.module.less';

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

        return (
            <DocumentTitle title={title ? `张为杰的博客-${title}` : '张为杰的博客'}>
                <Layout style={{ minHeight: '100vh' }}>
                    <BackTop />
                    <Header />
                    <Breadcrumb title={title} />
                    {isHome ? <Banner /> : null}

                    <Layout className={styles.container}>
                        <Content>
                            <Row gutter={24}>
                                <Col xs={24} sm={18}>
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
                                </Col>
                                <Col xs={24} sm={6}>
                                    <NavSide />
                                </Col>
                            </Row>
                        </Content>
                    </Layout>
                    <Footer />
                </Layout>
            </DocumentTitle>
        );
    }
}

export default UserLayout;
