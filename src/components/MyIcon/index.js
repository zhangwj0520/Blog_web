/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-31 10:09:26
 * @LastEditTime: 2019-05-31 11:22:44
 * @Description: iconfont.cn上的图标
 **/
import React from 'react';
import { Icon } from 'antd';

const scriptUrl = '//at.alicdn.com/t/font_1215529_fh4gldzq58.js'; // 在 iconfont.cn 上生成

const Iconfont = Icon.createFromIconfontCN({
    scriptUrl
});

const MyIcon = ({ type, style, onClick }) => {
    return <Iconfont type={type} style={{ fontSize: 16, ...style }} onClick={onClick} />;
};
export default MyIcon;
