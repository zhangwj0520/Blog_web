/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 14:07:19
 * @LastEditTime: 2019-05-28 14:19:25
 * @Description:
 **/
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { makeRootReducer } from './reducerFunc';

export const browserHistory = createBrowserHistory();
const routingMiddleware = routerMiddleware(browserHistory);

// export function configureStore() {
const initialState = {};
const middlewares = [thunk, routingMiddleware];
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
}

const enhancers = [applyMiddleware(...middlewares)];

const composeEnhancers =
    process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              shouldHotReload: false
          })
        : compose;

export const store = createStore(makeRootReducer(), initialState, composeEnhancers(...enhancers));

store.reducers = {};

// return store;
// export  store;
// }
