/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 14:22:01
 * @LastEditTime: 2019-05-28 14:22:15
 * @Description:
 **/
// import axios from 'axios';
import axios from '../common/axios';

export async function postUserRegister(params) {
    return axios({
        url: '/blog/user/register',
        method: 'post',
        data: params
    });
}

export async function postUserLogin(params) {
    return axios({
        url: '/blog/user/login',
        method: 'post',
        data: params
    });
}
export async function getUser() {
    return axios({
        // url: '/mock/user/login',
        url: '/v1/users/all',
        method: 'get'
    });
}

export async function queryUsersInfo() {
    return axios({
        // url: '/mock/user/login',
        url: '/v1/users',
        method: 'get'
    });
}
export async function queryAllUserInfo() {
    return axios({
        // url: '/mock/user/login',
        url: '/v1/users/all',
        method: 'get'
    });
}
// export async function postUserRegister() {
//     const data = await {
//         status: 200,
//         statusText: 'ok',
//         currentAuthority: 'user'
//     };
//     return { data };
// }
