/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 14:23:01
 * @LastEditTime: 2019-05-30 17:59:15
 * @Description:
 **/
import moment from 'moment';
import nzh from 'nzh/cn';
import { message } from 'antd';
import { push } from 'react-router-redux';
import { store } from '../store/configureStore';

export async function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        let json = await response.json();
        return json;
    } else {
        let error;
        try {
            let json = await response.json();
            error = new Error(json.msg);
        } catch (e) {
            error = new Error(response.statusText);
        }
        error.response = response;
        throw error;
    }
}

export const checkDataStatus = json => {
    // 被手动取消
    if (json.exception === 'AbortError') {
        console.error('you have aborted the request');
        return false;
    }
    if (json.success === 'true' || json.success === true) {
        return true;
    }
    if (json.result && json.result.code === '000') {
        return true;
    }
    if (json.hasOwnProperty('header') && (json.header.success === true || json.header.success === 'true')) {
        return true;
    }
    if (json.success === 'false' || json.success === false) {
        message.error(json.msg, 3);
        return false;
    }
    if (json.hasOwnProperty('header') && (json.header.success === false || json.header.success === 'false')) {
        message.error(json.header.msg, 3);
        return false;
    }

    if (json.result && json.result.code !== '000') {
        message.error(json.result.msg || json.result.message, 3);
        return false;
    }
};

/**
 * 向服务端发送请求
 * @param {string} url 请求 url
 * @param {any} query  请求参数对象
 * @return {any} 返回 json 格式数据
 *
 * ### 会自动处理
 *  - 网络错误（发送请求失败）： 弹出错误警告并返回失败 json 对象
 *  - 状态码失败错误（非2XX 响应）：弹出错误警告并返回失败 json 对象
 *  - token 失效：将清空登录信息、跳转登录页面
 *
 * 否则算**请求成功**：返回完整 json 数据
 */
export const fetchData = async (url, query) => {
    try {
        const response = await fetch(url, {
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
        return json;
    } catch (error) {
        console.error(error);
        // message.error(`请求失败：${error.message}`)
        return {
            success: false,
            msg: error.message,
            exception: error.name
        };
    }
};

export const asyncActionCreator = (action, func) => {
    return query => async dispatch => {
        dispatch({
            type: action.request,
            payload: {
                isLoading: true
            }
        });
        try {
            const response = await func(query);
            dispatch({
                type: action.success,
                payload: {
                    isLoading: false,
                    status: response.status,
                    ...response.data
                }
            });
        } catch (error) {
            dispatch({
                type: action.failure,
                payload: {
                    isLoading: false,
                    ...error
                }
            });
        }
    };
};

export const reduxRouter = path => {
    store.dispatch(push(path));
};

export function fixedZero(val) {
    return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
    const now = new Date();
    const oneDay = 1000 * 60 * 60 * 24;

    if (type === 'today') {
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        return [moment(now), moment(now.getTime() + (oneDay - 1000))];
    }

    if (type === 'week') {
        let day = now.getDay();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);

        if (day === 0) {
            day = 6;
        } else {
            day -= 1;
        }

        const beginTime = now.getTime() - day * oneDay;

        return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
    }

    if (type === 'month') {
        const year = now.getFullYear();
        const month = now.getMonth();
        const nextDate = moment(now).add(1, 'months');
        const nextYear = nextDate.year();
        const nextMonth = nextDate.month();

        return [
            moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
            moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000)
        ];
    }

    const year = now.getFullYear();
    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

export function digitUppercase(n) {
    return nzh.toMoney(n);
}

export const pySegSort = arr => {
    if (!String.prototype.localeCompare) return null;
    let letters = 'abcdefghjklmnopqrstwxyz'.split('');
    let zh = '阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀'.split('');
    let segs = [];
    letters.map((item, i) => {
        let cur = { letter: item, data: [] };
        arr.map(item => {
            if (item.localeCompare(zh[i]) >= 0 && item.localeCompare(zh[i + 1]) < 0) {
                cur.data.push(item);
            }
        });
        if (cur.data.length) {
            cur.data.sort(function(a, b) {
                return a.localeCompare(b, 'zh');
            });
            segs.push(cur);
        }
    });
    return segs;
};

export const escape2Html = str => {
    const arrEntities = {
        lt: '<',
        gt: '>',
        nbsp: ' ',
        amp: '&',
        quot: '"'
    };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(all, t) {
        return arrEntities[t];
    });
};
