/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-30 19:00:03
 * @LastEditTime: 2019-05-31 08:04:57
 * @Description:
 **/
import { Icon, Menu } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import adminRouter from '../../../routes/admin';

const { SubMenu } = Menu;

class BaseMenu extends React.Component {
    state = {
        selectedKeys: 'home',
        openKeys: [], //当前展开的 SubMenu 菜单项 key 数组
        pathname: '/'
    };
    onMenuItem = item => {
        this.setState({ selectedKeys: item.key });
    };

    onOpenChange = openKeys => {
        this.setState({ openKeys: openKeys });
    };
    onCloseDrawer = () => {
        const { isMobile, onCollapse, collapsed } = this.props;
        if (isMobile) {
            onCollapse(!collapsed);
        }
    };

    // 递归生成菜单
    generateMenu = menuList => {
        const myIcon = item => <span className={classNames('iconfont', item.icon)} />;
        return menuList.map(item => {
            if (item.hide) return null;
            if (!item.isAuth) return null;
            return (
                <Menu.Item key={item.title} onClick={() => this.onMenuItem(item)}>
                    <Link to={item.pathname || ''} basename={item.title}>
                        <Icon component={() => myIcon(item)} />
                        <span>{item.title}</span>
                    </Link>
                </Menu.Item>
            );
        });
    };

    render() {
        const { openKeys, selectedKeys } = this.state;
        return (
            <Menu
                // theme={'dark'}
                // mode="vertical"
                // theme={theme}
                mode="inline"
                onOpenChange={this.onOpenChange}
                selectedKeys={[selectedKeys]}
                // style={{ padding: '16px 0', width: '100%' }}
                openKeys={openKeys}>
                {this.generateMenu(adminRouter)}
            </Menu>
        );
    }
}

export default BaseMenu;
