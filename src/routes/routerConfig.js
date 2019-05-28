/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 13:44:20
 * @LastEditTime: 2019-05-28 15:33:19
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

const routerConfig = [
    {
        pathname: '/',
        exact: true,
        title: '首页',
        component: Loadable(() => import('../pages/HomeBlog'))
    }
];

export default routerConfig;
