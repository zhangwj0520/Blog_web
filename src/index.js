/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 10:53:58
 * @LastEditTime: 2019-05-28 14:27:29
 * @Description:
 **/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
