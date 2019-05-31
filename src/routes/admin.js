/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 13:44:20
 * @LastEditTime: 2019-05-31 08:11:11
 * @Description:
 **/
import Loadable from '../components/asyncComponent';

/* 
全局路由配置
配置说明
pathname ----- 路径
exact ----- 是否完全匹配
title ----- 浏览器title
component -----组件  Bundle 有两个参数，
第一个是组件，第二个是reducer，reducer需要给对应的reducer对象添加reducer属性
详见各个模块下modules文件
isAuth ----- 权限 和菜单权限一致,页面无按钮路由也没有 
*/

const admin = [
    {
        pathname: '/admin',
        exact: true,
        title: '首页',
        icon: 'icon-home',
        isAuth: true,
        component: Loadable(() => import('../pages/AdminHome'))
    },
    {
        pathname: '/admin/2',
        exact: true,
        title: '首页1',
        icon: 'icon-home',
        isAuth: true,
        component: Loadable(() => import('../pages/AdminHome'))
    },
    {
        pathname: '/admin/3',
        exact: true,
        title: '首页2',
        icon: 'icon-home',
        isAuth: true,
        component: Loadable(() => import('../pages/AdminHome'))
    }
];

export default admin;
