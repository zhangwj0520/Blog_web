import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import getUserInfoReducer from './modules/getUserInfo';
import commonData from './modules/commonData';

import { store } from './configureStore';

export const makeRootReducer = reducers => {
    return combineReducers({
        routing: routerReducer,
        userInfo: getUserInfoReducer,
        commonData: commonData,
        ...reducers
    });
};

export const injectReducer = (name, reducers) => {
    store.reducers[name] = reducers;
    //可以过滤reducer ,只留公用的和当前页面的。不存在的页面的reducer将被删除回收
    store.replaceReducer(makeRootReducer(store.reducers)); //注入时更新
};
