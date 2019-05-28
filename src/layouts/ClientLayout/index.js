/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 13:50:04
 * @LastEditTime: 2019-05-28 17:54:38
 * @Description:
 **/
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { BackTop, Col, Layout, Row } from 'antd';
import _ from 'lodash';
import routerData from '../../routes/routerConfig';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

const { Content } = Layout;

class UserLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'MyBlog'
        };
    }
    static getDerivedStateFromProps(props, state) {
        const {
            location: { pathname }
        } = props;
        const res = _.find(routerData, { pathname });
        let title = res ? `张为杰的博客-${res.title}` : '张为杰的博客';
        return { title };
    }
    componentDidMount() {}

    render() {
        const { title } = this.state;

        return (
            <DocumentTitle title={title}>
                <Layout style={{ minHeight: '100vh' }}>
                    <BackTop />
                    <Header />
                    <Layout>
                        <Content>
                            <Row>
                                <Col xs={1} sm={1} md={1} lg={1} xl={3} xxl={5} />
                                <Col xs={22} sm={22} md={22} lg={20} xl={18} xxl={14}>
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={17} xl={17} xxl={17}>
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
                                        <Col
                                            xs={24}
                                            sm={24}
                                            md={24}
                                            lg={{ span: 6, offset: 1 }}
                                            xl={{ span: 6, offset: 1 }}
                                            xxl={{ span: 6, offset: 1 }}>
                                            <Sidebar />
                                        </Col>
                                    </Row>
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
