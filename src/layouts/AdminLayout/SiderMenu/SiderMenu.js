/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-30 19:00:03
 * @LastEditTime: 2019-05-30 19:00:03
 * @Description:
 **/
import React, { PureComponent, Suspense } from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import styles from './index.module.less';
import PageLoading from '../../../../components/PageLoading';

const BaseMenu = React.lazy(() => import('./BaseMenu'));
const { Sider } = Layout;

let firstMount = true;

export default class SiderMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        firstMount = false;
    }

    render() {
        const { collapsed, onCollapse, isMobile } = this.props;
        // const { openKeys } = this.state;
        // const defaultProps = collapsed ? {} : { openKeys };

        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="lg"
                onCollapse={collapse => {
                    if (firstMount || !isMobile) {
                        onCollapse(collapse);
                    }
                }}
                // style={{
                //     height: '100vh'
                // }}
                width={180}
                theme="dark"
                className={styles.sider}>
                <div className={styles.logo} id="logo">
                    <Link to="/">
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo" />
                        <h1>Antd</h1>
                    </Link>
                </div>
                <Suspense fallback={<PageLoading />}>
                    <BaseMenu
                        collapsed={collapsed}
                        onCollapse={onCollapse}
                        isMobile
                        mode="inline"
                        style={{ padding: '16px 0', width: '100%' }}
                    />
                </Suspense>
            </Sider>
        );
    }
}
