import { Router, Switch, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import AdminLayout from '../layouts/AdminLayout';
import UserLayout from '../layouts/UserLayout';
import { useDispatch } from 'react-redux';

import { getCommonData } from '../store/modules/commonData';

// 按照 Layout 分组路由
// UserLayout 对应的路由：/user/xxx
// BasicLayout 对应的路由：/xxx

const Routers = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        getCommonData(dispatch);
    }, []);

    return (
        <Router history={props.history}>
            <Switch>
                <Route key={'admin'} path="/admin" component={AdminLayout} />
                <Route key={'user'} path="/user" component={UserLayout} />
                <Route key={'/'} path="/" component={BasicLayout} />
            </Switch>
        </Router>
    );
};
export default Routers;

// const tag = [
//     { value: 'React', icon: 'icon-React', color: '#61dafb' },
//     { value: 'Vue', icon: 'icon-Vue', color: '#4fc08d' },
//     { value: 'Angular', icon: 'icon-angular', color: '#4fc08d' },
//     { value: 'JavaScript', icon: 'icon-js', color: '#4fc08d' },
//     { value: 'ES6', icon: 'icon-es6', color: '#4fc08d' },
//     { value: 'Node', icon: 'icon-node-js', color: '#4fc08d' },
//     { value: 'Chrome', icon: 'icon-Chrome', color: '#61dafb' },
//     { value: 'HTML', icon: 'icon-HTML', color: '#4fc08d' },
//     { value: 'CSS', icon: 'icon-CSS', color: '#4fc08d' },
//     { value: 'IOS', icon: 'icon-ios', color: '#4fc08d' },
//     { value: 'Android', icon: 'icon-Android', color: '#4fc08d' },
//     { value: 'Flutter', icon: 'icon-flutter', color: '#4fc08d' },
//     { value: 'ReactNative', icon: 'icon-ReactNative', color: '#4fc08d' },
//     { value: 'Java', icon: 'icon-java', color: '#4fc08d' },
//     { value: 'MongoDB', icon: 'icon-ziyuan', color: '#4fc08d' },
//     { value: 'Mysql', icon: 'icon-MYSQL', color: '#4fc08d' },
//     { value: 'Tools', icon: 'icon-tools', color: '#4fc08d' },
//     { value: '小程序', icon: 'icon-xiaochengxu', color: '#4fc08d' },
//     { value: '服务器', icon: 'icon-Nginx', color: '#4fc08d' }
// ];
// const types = [{ value: '前端' }, { value: '后端' }, { value: '数据库' }, { value: 'WEB' }, { value: 'App' }];
