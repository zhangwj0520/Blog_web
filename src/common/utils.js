/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 14:23:01
 * @LastEditTime: 2019-05-28 14:24:24
 * @Description:
 **/
import moment from 'moment';
import nzh from 'nzh/cn';
import { push } from 'react-router-redux';
import { store } from '../store/configureStore';

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
