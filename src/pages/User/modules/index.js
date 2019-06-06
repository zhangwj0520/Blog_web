import { combineReducers } from 'redux';
import { postUserRegister, postUserLogin } from '../../../api/users';
import { asyncActionCreator } from '../../../common/utils';

const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';

const userRegisterActions = {
    request: USER_REGISTER_REQUEST,
    success: USER_REGISTER_SUCCESS,
    failure: USER_REGISTER_FAILURE
};
export const userRigister = asyncActionCreator(userRegisterActions, postUserRegister);
let initialUserState = { isLoading: false };
function userRigisterReducer(state = initialUserState, { type, payload }) {
    switch (type) {
        case USER_REGISTER_REQUEST:
            return Object.assign({}, state, {
                ...payload
            });
        case USER_REGISTER_SUCCESS:
            return Object.assign({}, state, {
                ...payload
            });
        case USER_REGISTER_FAILURE:
            return Object.assign({}, state, {
                ...payload
            });
        default:
            return state;
    }
}

//登录
const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

const userLoginActions = {
    request: USER_LOGIN_REQUEST,
    success: USER_LOGIN_SUCCESS,
    failure: USER_LOGIN_FAILURE
};
export const userLogin = asyncActionCreator(userLoginActions, postUserLogin);
const { authority, fullName, phone } = localStorage;
let initialLoginState = { authority, fullName, phone };
export function userLoginReducer(state = initialLoginState, { type, payload }) {
    switch (type) {
        case USER_LOGIN_REQUEST:
            return Object.assign({}, state, {
                ...payload
            });
        case USER_LOGIN_SUCCESS:
            console.log(payload);
            //存储到ls
            const { token, success, user } = payload;
            if (success === true) {
                const { fullName, phone, authority, avatarUrl } = user;
                // console.log(jwt_decode(token));
                localStorage.setItem('reactToken', token);
                localStorage.setItem('fullName', fullName);
                localStorage.setItem('phone', phone);
                localStorage.setItem('authority', authority);
                localStorage.setItem('avatarUrl', avatarUrl);
            }

            return Object.assign({}, state, {
                ...payload
            });
        case USER_LOGIN_FAILURE:
            return Object.assign({}, state, {
                ...payload
            });
        default:
            return state;
    }
}

const users = combineReducers({
    userRigisterReducer,
    userLoginReducer
});
users.reducer = 'users';

export default users;
