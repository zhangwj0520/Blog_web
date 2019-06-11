import axios from 'axios';
import { notification, message } from 'antd';
import { reduxRouter } from './utils';

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限(令牌、用户名、密码错误)。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
};

let token = '';
axios.defaults.withCredentials = false;
axios.defaults.headers.common['token'] = token;

// //请求拦截

axios.interceptors.request.use(
    config => {
        if (localStorage.Token) config.headers.Authorization = localStorage.Token;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//响应拦截
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const { status, statusText, data } = error.response;
        const errortext = data.msg || codeMessage[status] || statusText;

        if (status === 401) {
            localStorage.clear();
            reduxRouter('/user/login');
            message.error('登录已失效效，请重新登录');
            return;
        } else {
            message.error(errortext);
        }

        // if (status === 403) {
        //     message.error(errortext);
        //     // reduxRouter('/exception/403');
        // }
        // if (status <= 504 && status >= 500) {
        //     // reduxRouter('/exception/500');
        // }
        // if (status >= 404 && status < 422) {
        //     notification.error({
        //         message: `请求错误 : ${status}`,
        //         description: '抱歉,您访问的页面不存在!!'
        //     });
        //     return;
        // }

        return Promise.reject(error);
    }
);

export default axios;
