/* eslint-disable react-hooks/rules-of-hooks */
/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-29 14:57:56
 * @LastEditTime: 2019-06-04 15:03:47
 * @Description: 可以取消的fetch
 **/
import { useState, useRef } from 'react';
export const STATUS = {
    INIT: 'INIT',
    FETCHING: 'FETCHING',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
    ABORT: 'ABORT'
};

export function HookGet(url) {
    // 请求参数
    const [fetchStatus, setStatus] = useState(STATUS.INIT);
    const [total, setTotal] = useState(0);
    const [data, setData] = useState({});

    const controller = useRef(new AbortController());

    let fetchDataRef = useRef(async query => {
        let newUrl = url;
        if (query) {
            const queryStr = Object.keys(query)
                .reduce((ary, key) => {
                    query[key] && ary.push(encodeURIComponent(key) + '=' + encodeURIComponent(query[key]));
                    return ary;
                }, [])
                .join('&');
            newUrl = `${url}?${queryStr}`;
        }
        if (process.env.NODE_ENV === 'development') {
            console.group(`Get请求`);
            console.log(`请求地址 : %c${url}`, 'color: #4CAF50; font-weight: bold; font-size: 1.2em;');
            console.log(
                `请求参数 : %c${JSON.stringify(query)}`,
                'color: #4CAF50; font-weight: bold; font-size: 1.2em;'
            );
            console.log(`Get地址 : %c${newUrl}`, 'color: #4CAF50; font-weight: bold; font-size: 1.2em;');
            console.groupEnd();
        }

        controller.current.abort();
        controller.current = new AbortController();
        setStatus(STATUS.FETCHING);
        try {
            let response = await fetch(newUrl, {
                signal: controller.current.signal,
                method: 'GET',
                mode: 'cors'
            });
            let json = await response.json();
            let total = (json.data && json.data.totalSize) || json.totalSize || 1;
            setTotal(Number(total));
            setData(json.data || json);
            setStatus(STATUS.SUCCESS);
            // return json;
        } catch (error) {
            // abort 单独处理，如果在此处理 abort 的话，false 会作为一个微任务在 true 后边运行，
            // 连续两次请求会导致 fetching 为 false
            if (error.name !== 'AbortError') {
                setStatus(STATUS.FAILURE);
                // message.error(error.message);
            }
            let json = {
                success: false,
                msg: error.message,
                exception: error.name
            };
            setData(json);
        }
    });
    let fetchData = fetchDataRef.current;

    return [fetchData, data, total, fetchStatus === STATUS.FETCHING, fetchStatus];
    // return {
    //     fetchData,
    //     isLoading: fetchStatus === STATUS.FETCHING,
    //     fetchStatus,
    //     result,
    //     total,
    //     data
    // };
}
export function HookPost(url) {
    // 请求参数
    const [fetchStatus, setStatus] = useState(STATUS.INIT);
    const [result, setResult] = useState({});
    const [total, setTotal] = useState(0);
    const [data, setData] = useState({});
    const controller = useRef(new AbortController());

    const fetchData = async query => {
        if (process.env.NODE_ENV === 'development') {
            console.group(`Post请求`);
            console.log(`请求地址 : %c${url}`, 'color: #4CAF50; font-weight: bold; font-size: 1.2em;');
            console.log(
                `请求参数 : %c${JSON.stringify(query)}`,
                'color: #4CAF50; font-weight: bold; font-size: 1.2em;'
            );
            console.groupEnd();
        }

        controller.current.abort();
        controller.current = new AbortController();
        setStatus(STATUS.FETCHING);
        try {
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
            let json = await response.json();
            let total = (json.data && json.data.totalSize) || json.totalSize || 1;
            setTotal(Number(total));
            setData(json.data || json);
            setResult(json);
            setStatus(STATUS.SUCCESS);
        } catch (error) {
            if (error.name !== 'AbortError') {
                setStatus(STATUS.FAILURE);
            }
            let json = {
                success: false,
                msg: error.message,
                exception: error.name
            };
            setResult(json);
        }
    };

    return {
        fetchData,
        isLoading: fetchStatus === STATUS.FETCHING,
        fetchStatus,
        result,
        total,
        data
    };
}

export function Fetch(url, method = 'get', Authorization = true) {
    // 请求参数
    const [fetchStatus, setStatus] = useState(STATUS.INIT);
    const [total, setTotal] = useState(0);
    const [data, setData] = useState();
    const [result, setResult] = useState();
    const controller = useRef(new AbortController());
    let fetchDataRef = useRef(async query => {
        controller.current.abort();
        controller.current = new AbortController();
        setStatus(STATUS.FETCHING);
        let initObj = {
            signal: controller.current.signal,
            method: method,
            mode: 'cors'
        };

        let newUrl = url;
        if (method === 'get') {
            if (query) {
                const queryStr = Object.keys(query)
                    .reduce((ary, key) => {
                        query[key] && ary.push(encodeURIComponent(key) + '=' + encodeURIComponent(query[key]));
                        return ary;
                    }, [])
                    .join('&');
                newUrl = `${url}?${queryStr}`;
            }
            if (Authorization) {
                initObj = {
                    signal: controller.current.signal,
                    method: method,
                    mode: 'cors',
                    headers: {
                        Authorization: localStorage.getItem('Token')
                    }
                };
            }
        } else {
            initObj = {
                signal: controller.current.signal,
                method: 'post',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    Authorization: localStorage.getItem('Token')
                },
                mode: 'cors',
                body: JSON.stringify(query)
            };
        }

        if (process.env.NODE_ENV === 'development') {
            console.group(`${method}请求`);
            console.log(`请求地址 : %c${url}`, 'color: #4CAF50; font-weight: bold; font-size: 1.2em;');
            console.log(
                `请求参数 : %c${JSON.stringify(query)}`,
                'color: #4CAF50; font-weight: bold; font-size: 1.2em;'
            );
            console.log(`${method}地址 : %c${newUrl}`, 'color: #4CAF50; font-weight: bold; font-size: 1.2em;');
            console.groupEnd();
        }

        try {
            let response = await fetch(newUrl, initObj);
            let json = await response.json();
            let total = (json.data && json.data.totalSize) || json.totalSize || 1;
            setTotal(Number(total));
            setData(json.data || json);
            setResult(json);
            setStatus(STATUS.SUCCESS);
        } catch (error) {
            // abort 单独处理，如果在此处理 abort 的话，false 会作为一个微任务在 true 后边运行，
            // 连续两次请求会导致 fetching 为 false
            if (error.name !== 'AbortError') {
                setStatus(STATUS.FAILURE);
                console.log(error.message);
            }
            let json = {
                success: false,
                msg: error.message,
                exception: error.name
            };
            setResult(json); //注释此行, 状态不更新,不会更新组件的状态, 应该去掉该行
        }
    });
    let fetchData = fetchDataRef.current;
    let abort = () => {
        fetchStatus === STATUS.FETCHING && setStatus(STATUS.ABORT);
        controller.current.abort();
    };

    return [fetchData, data, total, result, fetchStatus === STATUS.FETCHING, fetchStatus, abort];
}
