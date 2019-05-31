/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 13:44:20
 * @LastEditTime: 2019-05-30 18:54:55
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

const client = [
    {
        pathname: '/',
        exact: true,
        title: '首页',
        component: Loadable(() => import('../pages/HomeBlog'))
    },
    {
        pathname: '/article',
        exact: true,
        title: '文章',
        component: Loadable(() => import('../pages/Articles'))
    },
    {
        pathname: '/timeline',
        exact: true,
        title: '归档',
        component: Loadable(() => import('../pages/TimeLine'))
    },
    {
        pathname: '/gather',
        exact: true,
        title: '点滴',
        component: Loadable(() => import('../pages/Gather'))
    }
];

export default client;
