/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 13:49:08
 * @LastEditTime: 2019-05-31 13:43:29
 * @Description: 路由
 **/
import { Router, Switch, Route } from 'react-router-dom';
import React from 'react';
// import UserLayout from '../layouts/UserLayout';
// import BasicLayout from '../layouts/BasicLayout';
import BasicLayout from '../layouts/BasicLayout';
import AdminLayout from '../layouts/AdminLayout';

// 按照 Layout 分组路由
// UserLayout 对应的路由：/user/xxx
// BasicLayout 对应的路由：/xxx
class router extends React.Component {
    render() {
        return (
            <Router history={this.props.history}>
                <Switch>
                    {/* <Route path="/user" component={UserLayout} /> */}
                    <Route path="/admin" component={AdminLayout} />
                    <Route path="/" component={BasicLayout} />
                </Switch>
            </Router>
        );
    }
}
export default router;
