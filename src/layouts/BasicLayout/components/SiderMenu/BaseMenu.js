import {Icon, Menu} from 'antd';
import * as React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {asideMenuConfig} from '../../../../routes/menuConfig';

import routerData from '../../../../routes/routerConfig';

// import styles from './index.module.less';

const {SubMenu} = Menu;

class BaseMenu extends React.Component {
    state = {
        selectedKeys: 'home',
        openKeys: [], //当前展开的 SubMenu 菜单项 key 数组
        pathname: '/'
    };
    onMenuItem = item => {
        this.setState({selectedKeys: item.key});
    };

    onOpenChange = openKeys => {
        this.setState({openKeys: openKeys});
    };
    onCloseDrawer = () => {
        const {isMobile, onCollapse, collapsed} = this.props;
        if (isMobile) {
            onCollapse(!collapsed);
        }
    };

    // 递归生成菜单
    generateMenu = menuList => {
        const myIcon = item => <span className={classNames('iconfont', item.icon)} style={{paddingRight: '5px'}} />;
        return menuList.map(item => {
            if (item.hide) return null;
            if (!item.isAuth) return null;
            if (item.children) {
                return (
                    <SubMenu
                        key={item.name}
                        title={
                            <span>
                                <Icon component={() => myIcon(item)} />
                                <span>{item.name}</span>
                            </span>
                        }>
                        {this.generateMenu(item.children)}
                    </SubMenu>
                );
            } else {
                return (
                    <Menu.Item key={item.name} onClick={() => this.onMenuItem(item)}>
                        <Link to={item.path || ''} basename={item.name}>
                            <Icon component={() => myIcon(item)} />
                            <span>{item.name}</span>
                        </Link>
                    </Menu.Item>
                );
            }
        });
    };

    render() {
        const {openKeys, selectedKeys} = this.state;
        return (
            <Menu
                theme={'dark'}
                mode="vertical"
                onOpenChange={this.onOpenChange}
                selectedKeys={[selectedKeys]}
                style={{padding: '16px 0', width: '100%'}}
                openKeys={openKeys}>
                {this.generateMenu(asideMenuConfig)}
            </Menu>
        );
    }
}

export default BaseMenu;
