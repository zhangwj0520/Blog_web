import React, {PureComponent} from 'react';
import {Menu, Icon, Avatar, Tooltip} from 'antd';
import classNames from 'classnames';
import {withRouter} from 'react-router-dom';

import HeaderSearch from '../../../../components/HeaderSearch';
import HeaderDropdown from '../../../../components/HeaderDropdown';
import './index.less';

export default class GlobalHeaderRight extends PureComponent {
    render() {
        const {onHeaderMenuClick} = this.props;
        const {fullname, avatarUrl} = localStorage;
        let url =
            avatarUrl === 'undefined'
                ? 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
                : avatarUrl;
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
            <div className="right">
                <HeaderSearch
                    className={classNames('action', 'search')}
                    placeholder="搜索"
                    dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
                    onSearch={value => {
                        console.log('input', value); // eslint-disable-line
                    }}
                    onPressEnter={value => {
                        console.log('enter', value); // eslint-disable-line
                    }}
                />
                <Tooltip title={'tooltip'}>
                    <a
                        target="_blank"
                        href="https://pro.ant.design/docs/getting-started"
                        rel="noopener noreferrer"
                        className="action">
                        <Icon type="question-circle-o" />
                    </a>
                </Tooltip>

                <HeaderDropdown overlay={menu}>
                    <span className={classNames('action', 'account')}>
                        <Avatar size="small" className="avatar" src={url} alt="avatar" />
                        <span className="name">{fullname}</span>
                    </span>
                </HeaderDropdown>
            </div>
        );
    }
}
