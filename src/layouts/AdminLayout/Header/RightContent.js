import React, { PureComponent } from 'react';
import { Menu, Icon, Avatar } from 'antd';
import classNames from 'classnames';
import HeaderDropdown from '../../../components/HeaderDropdown';

import './index.less';

export default class GlobalHeaderRight extends PureComponent {
    render() {
        const { onHeaderMenuClick } = this.props;
        const { userName } = localStorage;
        let url = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
        const menu = (
            <Menu className="menu" selectedKeys={[]} onClick={onHeaderMenuClick}>
                <Menu.Item key="userCenter">
                    <Icon type="user" />
                    <span>user</span>
                </Menu.Item>
                <Menu.Item key="userinfo">
                    <Icon type="setting" />
                    <span>setting</span>
                </Menu.Item>
                <Menu.Item key="triggerError">
                    <Icon type="close-circle" />
                    <span>close</span>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">
                    <Icon type="logout" />
                    <span>退出登录</span>
                </Menu.Item>
            </Menu>
        );
        return (
            <HeaderDropdown overlay={menu} className="right">
                <span className={classNames('action', 'account')}>
                    <Avatar size="normal" className="avatar" src={url} alt="avatar" />
                    <span className="name">{userName}</span>
                </span>
            </HeaderDropdown>
        );
    }
}
