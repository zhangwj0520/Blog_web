/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 13:50:04
 * @LastEditTime: 2019-05-28 14:03:25
 * @Description:
 **/
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import styles from './index.module.less';
// import getPageTitle from '../../utils/getPageTitle';
import routerData from '../../routes/routerConfig';

class UserLayout extends Component {
    componentDidMount() {}

    render() {
        const {
            location: { pathname }
        } = this.props;

        // const title = getPageTitle(pathname) ? getPageTitle(pathname).title : 'title';

        return (
            <DocumentTitle title={'title'}>
                <div className={styles.container}>
                    <Switch>
                        {routerData.map((item, index) => {
                            return item.component ? (
                                <Route key={index} path={item.path} component={item.component} exact={item.exact} />
                            ) : null;
                        })}
                    </Switch>
                </div>
            </DocumentTitle>
        );
    }
}

export default UserLayout;
