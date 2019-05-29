/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 10:53:58
 * @LastEditTime: 2019-05-29 10:51:04
 * @Description:
 **/
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { syncHistoryWithStore } from 'react-router-redux';

import { store, browserHistory } from './store/configureStore';
import Router from './routes/router';

import moment from 'moment';
import 'moment/locale/zh-cn';
import './global.less';
moment.locale('zh-cn');

const history = syncHistoryWithStore(browserHistory, store);
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <LocaleProvider locale={zhCN}>
                    <Router history={history} />
                </LocaleProvider>
            </Provider>
        );
    }
}

export default App;
