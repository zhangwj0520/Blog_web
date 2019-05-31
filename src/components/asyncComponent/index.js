/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 11:37:33
 * @LastEditTime: 2019-05-31 16:00:31
 * @Description:
 **/

import React from 'react';
import NProgress from 'nprogress';
// import NProgress from '../PageProgress/nprogress';  //为啥不可以
import { injectReducer } from '../../store/reducerFunc';
import Loading from '../PageLoading';
import ErrorComponent from '../ErrorPage';
import '../PageProgress/nprogress.css'; //这个样式必须引入

NProgress.configure({ showSpinner: true });

const moduleDefaultExport = module => module.default || module;

function capture(fn) {
    let promise = fn();
    return promise;
}

function load(opts) {
    let promise = capture(() => {
        if (opts.reducerLoader) {
            return [opts.loader(), opts.reducerLoader()];
        }
        return [opts.loader()];
    });

    let state = {
        loading: true,
        loaded: null,
        error: null
    };

    state.promise = Promise.all(promise)
        .then(([loaded, module]) => {
            state.loading = false;
            state.loaded = loaded;
            if (module) {
                const reducers = moduleDefaultExport(module);
                injectReducer(module.default.reducer, reducers);
            }

            // NProgress.set(0.99);
            NProgress.done();
            console.log('结束');
            return loaded;
        })
        .catch(err => {
            state.loading = false;
            state.error = err;
            NProgress.done();
            console.error(err);
            throw err;
        });

    return state;
}

function resolve(obj) {
    return obj && obj.__esModule ? obj.default : obj;
}

function render(loaded, props) {
    return React.createElement(resolve(loaded), props);
}

function createLoadableComponent(loadFn, options) {
    let opts = Object.assign(
        {
            loader: null,
            reducerLoader: null,
            delay: 200,
            timeout: null,
            render: render
        },
        options
    );

    let res = null;
    return class LoadableComponent extends React.Component {
        constructor(props) {
            super(props);
            if (!res) {
                //进度条
                console.log('进度条');
                NProgress.start();
                res = loadFn(opts);
            }

            this.state = {
                error: res.error,
                pastDelay: false,
                timedOut: false,
                loading: res.loading,
                loaded: res.loaded
            };
        }

        static preload() {
            if (!res) {
                res = loadFn(opts);
            }
        }

        componentWillMount() {
            this._mounted = true;

            if (!res.loading) {
                return;
            }

            if (typeof opts.delay === 'number') {
                this._delay = setTimeout(() => {
                    this.setState({ pastDelay: true });
                }, opts.delay);
            }

            if (typeof opts.timeout === 'number') {
                this._timeout = setTimeout(() => {
                    this.setState({ timedOut: true });
                }, opts.timeout);
            }

            let update = () => {
                if (!this._mounted) {
                    return;
                }

                this.setState({
                    error: res.error,
                    loaded: res.loaded,
                    loading: res.loading
                });

                this._clearTimeouts();
            };

            res.promise
                .then(() => {
                    update();
                })
                .catch(err => {
                    console.error(err);
                    update();
                    // window.location.reload(true)
                    throw err;
                });
        }

        componentWillUnmount() {
            NProgress.remove();
            this._mounted = false;
            this._clearTimeouts();
        }

        _clearTimeouts() {
            clearTimeout(this._delay);
            clearTimeout(this._timeout);
        }
        // shouldComponentUpdate(nextProps,nextState){
        //     if(nextState.error!=this.state.error||
        //         nextState.loaded!=this.state.loaded||
        //         nextState.loading!=this.state.loading||
        //         nextState.pastDelay!=this.state.pastDelay||
        //         nextState.timedOut!=this.state.timedOut||
        //         nextProps.match.url!=this.props.match.url||
        //         nextProps.match.isExact!=this.props.match.isExact||
        //         nextProps.match.params!=this.props.match.params
        //     ){
        //         return true
        //     }
        //     return false
        // }

        render() {
            // alert(this.state.error)
            if (this.state.loading && this.state.pastDelay) {
                return (
                    <Loading
                        isLoading={this.state.loading}
                        pastDelay={this.state.pastDelay}
                        timedOut={this.state.timedOut}
                    />
                );
            } else if (this.state.error) {
                return <ErrorComponent error={this.state.error} />;
            } else if (this.state.loaded) {
                return opts.render(this.state.loaded, this.props);
            } else {
                return <div />;
            }
        }
    };
}

const Loadable = (loader, reducerLoader) => {
    return createLoadableComponent(load, {
        loader: loader,
        reducerLoader: reducerLoader,
        delay: 500
    });
};

export default Loadable;
