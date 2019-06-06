import React, { Component } from 'react';
import { Link, withRouter, Switch, Route } from 'react-router-dom';
import { Icon } from 'antd';
import _ from 'lodash';
import DocumentTitle from 'react-document-title';
import styles from './index.module.less';
import routerData from '../../routes/routerConfig';

@withRouter
class UserLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '管理系统'
        };
    }
    static getDerivedStateFromProps(props, state) {
        const {
            location: { pathname }
        } = props;
        const res = _.find(routerData, { pathname });
        let title = res ? res.title : '';
        return { title };
    }

    render() {
        const { title } = this.state;
        return (
            <DocumentTitle title={title}>
                <div className={styles.container}>
                    <div className={styles.lang}>
                        <Icon type="global" title="global" />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.top}>
                            <div className={styles.header}>
                                <Link to="/">
                                    <img
                                        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                                        alt="logo"
                                        className={styles.logo}
                                    />
                                    <span className={styles.title}>Ant Design</span>
                                </Link>
                            </div>
                            <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
                        </div>

                        <Switch>
                            {routerData.map((item, index) => {
                                return item.component ? (
                                    <Route
                                        key={index}
                                        path={item.pathname}
                                        component={item.component}
                                        exact={item.exact}
                                    />
                                ) : null;
                            })}
                        </Switch>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

export default UserLayout;
