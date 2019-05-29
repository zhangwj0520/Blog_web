/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-29 14:57:56
 * @LastEditTime: 2019-05-29 16:18:52
 * @Description: 可以取消的fetch
 **/
import { useState, useRef } from 'react';

export const STATUS = {
    INIT: 'INIT',
    FETCHING: 'FETCHING',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE'
};

export function HookGet(url) {
    // 请求参数
    const [fetchStatus, setStatus] = useState(STATUS.INIT);
    const [result, setResult] = useState({});
    const [total, setTotal] = useState(0);
    const [data, setData] = useState({});

    const controller = useRef(new AbortController());

    const fetchData = async query => {
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
            setResult(json);
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
