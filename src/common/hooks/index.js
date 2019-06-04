/* eslint-disable react-hooks/rules-of-hooks */
/**
 * @LastEditors: zhang weijie
 * @Date: 2019-06-01 07:10:29
 * @LastEditTime: 2019-06-03 15:02:39
 * @Description:
 **/
import { useState, useRef, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { checkDataStatus, checkHttpStatus } from '../../common/utils';
import { AbortController as AbortControllerBackup } from './abortable';

/**
 * 使函数组件具有 class 组件的 setState 方法
 * @param {Object} initState 初始状态，和 class 的 state 一样
 * @return {[Object, function]}
 */
export function useSetState(initState = {}) {
    const [state, replaceState] = useState(initState);
    function setState(newState) {
        if (typeof newState === 'function') {
            replaceState(prevState => ({
                ...prevState,
                ...newState(prevState)
            }));
        } else {
            replaceState(prevState => ({
                ...prevState,
                ...newState
            }));
        }
    }
    return [state, setState];
}

/**
 * 使用 antd Modal
 * @param {boolean} initVisible
 * @return {{visible: boolean, open: function, close: function}}
 */
export function useModal(initVisible = false) {
    const [visible, setVisible] = useState(initVisible);

    function open() {
        setVisible(true);
    }

    function close() {
        setVisible(false);
    }

    return {
        visible,
        open,
        close
    };
}

function isSafari() {
    return window.navigator.vendor.includes('Apple');
}
export const STATUS = {
    INIT: 'INIT',
    FETCHING: 'FETCHING',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
    ABORT: 'ABORT'
};

function warn(...args) {
    if (process.env.NODE_ENV === 'development') {
        console.group(`%c${args[0]}`, 'color: red; font-weight: bold; font-size: 1.2em;');
        if (args.length > 1) {
            console.error(args.slice(1).join('\n'));
        }
        console.groupEnd();
    }
}

function nope() {}

/**
 * 可取消的 fetch
 *
 * 通常是不应该在 if 内使用 hooks 的，但是因为针对单独的用户端，该 if condition 不会变，因此不会产生问题
 *
 * fetchData 和 common/utils/fetchData 接口一致，
 *      请求成功时返回服务端返回的 json，
 *      出现错误（状态码、被用户取消）返回失败的 json
 *
 * ⚠️ Safari 11.1 虽然实现了 AbortController，但是不能 abort
 */
export function useAbortableFetch(url, method = 'get') {
    const [status, setStatus] = useState(STATUS.INIT);
    const [result, setResult] = useState({});
    if (window.AbortController && !isSafari()) {
        const controller = useRef(new AbortController());
        let abortableFetchRef = useRef(async query => {
            controller.current.abort();
            controller.current = new AbortController();

            setStatus(STATUS.FETCHING);

            try {
                let response = await fetch(url, {
                    signal: controller.current.signal,
                    method: method,
                    mode: 'cors'
                });

                let json = await checkHttpStatus(response);
                setResult(json);
                if (checkDataStatus(json)) {
                    // onSuccess(json);
                    setStatus(STATUS.SUCCESS);
                } else {
                    // onFailure(json);
                    setStatus(STATUS.FAILURE);
                }
                return json;
            } catch (error) {
                // abort 单独处理，如果在此处理 abort 的话，false 会作为一个微任务在 true 后边运行，
                // 连续两次请求会导致 fetching 为 false
                if (error.name !== 'AbortError') {
                    setStatus(STATUS.FAILURE);
                    message.error(error.message);
                }
                let json = {
                    success: false,
                    msg: error.message,
                    exception: error.name
                };
                // onFailure(json);
                setResult(json);
                return json;
            }
        });
        let abortableFetch = abortableFetchRef.current;
        let abort = () => {
            status === STATUS.FETCHING && setStatus(STATUS.ABORT);
            controller.current.abort();
        };
        return [
            abortableFetch,
            result,
            status === STATUS.FETCHING, //  fetching:
            status,
            abort
        ];
    } else {
        const controller = useRef(new AbortControllerBackup());
        let realFetchRef = useRef(async query => {
            controller.current.abort();
            controller.current = new AbortControllerBackup();

            setStatus(STATUS.FETCHING);

            let response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify(query)
            });

            let json = await checkHttpStatus(response);
            setResult(json);
            // 如果最新取消了请求，之前的请求不应该在更新此状态
            if (!controller.current.signal.aborted) {
                if (checkDataStatus(json)) {
                    // onSuccess(json);
                    setStatus(STATUS.SUCCESS);
                } else {
                    // onFailure(json);
                    setStatus(STATUS.FAILURE);
                }
            }
            return json;
        });

        let realFetch = realFetchRef.current;

        let abortSignal = () =>
            new Promise((_, reject) => {
                controller.current.signal.addEventListener('abort', () => {
                    let error = new Error('The user aborted a request');
                    error.name = 'AbortError';
                    reject(error);
                });
            });

        let abortableFetch = async (url, query) => {
            try {
                let json = await Promise.race([realFetch(url, query), abortSignal()]);
                return json;
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setStatus(STATUS.FAILURE);
                    message.error(error.message);
                }
                let json = {
                    success: false,
                    msg: error.message,
                    exception: error.name
                };
                // onFailure(json);
                setResult(json);
                return json;
            }
        };

        let abort = () => {
            status === STATUS.FETCHING && setStatus(STATUS.ABORT);
            controller.current.abort();
        };
        return {
            abortableFetch,
            abort,
            fetching: status === STATUS.FETCHING,
            status,
            result
        };
    }
}

/**
 * 常见的 表单 + 表格 页面
 * @param {string} fetchUrl 数据请求 url
 * @param {Object} [form】 antd Form 包装后的 form 属性
 * @param {number} [pageSize=20] 每页数据条数
 */
export function usePagableTable(fetchUrl, form, pageSize = 20) {
    const [state, setState] = useSetState({
        dataSource: [],
        query: {},
        current: 1,
        total: 0
    });

    const { abortableFetch, fetching } = useAbortableFetch(json => {
        setState({
            dataSource: json.data.records,
            total: Number(json.totalSize || json.data.totalSize)
        });
    });

    let fetchPageDataRef = useRef(async function fetchPageData(query, pageNo) {
        setState({
            query,
            current: pageNo
        });
        query = {
            ...query,
            pageNo,
            pageSize
        };
        let json = await abortableFetch(fetchUrl, query);
        return json;
    });

    let fetchPageData = fetchPageDataRef.current;

    function gotoPage(pageNo) {
        fetchPageData(state.query, pageNo);
    }

    function refresh() {
        gotoPage(state.current);
    }

    function submit(e) {
        e.preventDefault();
        form.validateFields((error, query) => {
            if (!error) {
                fetchPageData(query, 1);
            }
        });
    }

    function updateDataSource(dataSource) {
        setState({ dataSource });
    }

    const pagination = {
        current: state.current,
        total: state.total,
        showTotal: total => `共${total}条`,
        pageSize,
        onChange: gotoPage
    };
    return {
        state,
        pagination,
        fetchPageData,
        gotoPage,
        refresh,
        submit,
        updateDataSource,
        tableProps: {
            dataSource: state.dataSource,
            pagination,
            loading: fetching
        }
    };
}
