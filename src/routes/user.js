/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 13:44:20
 * @LastEditTime: 2019-06-03 14:31:03
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

const user = [
    {
        pathname: '/user/login',
        exact: true,
        title: '登录',
        isAuth: true,
        component: Loadable(() => import('../pages/User/Login'), () => import('../pages/User/modules'))
    },
    {
        pathname: '/user/register',
        exact: true,
        title: '注册',
        isAuth: true,
        component: Loadable(() => import('../pages/User/Register'), () => import('../pages/User/modules'))
    },
    {
        pathname: '/user/register-result',
        exact: true,
        title: '注册成功',
        isAuth: true,
        component: Loadable(() => import('../pages/User/RegisterResult'), () => import('../pages/User/modules'))
    }
];

export default user;
