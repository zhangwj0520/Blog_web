/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 14:07:19
 * @LastEditTime: 2019-05-28 14:07:19
 * @Description:
 **/
import { queryUsersInfo } from '../../api/users';
import { asyncActionCreator } from '../../common/utils';

//登录
const USER_INFOS_REQUEST = 'USER_INFOS_REQUEST';
const USER_INFOS_SUCCESS = 'USER_INFOS_SUCCESS';
const USER_INFOS_FAILURE = 'USER_INFOS_FAILURE';

const getUserInfoActions = {
    request: USER_INFOS_REQUEST,
    success: USER_INFOS_SUCCESS,
    failure: USER_INFOS_FAILURE
};
export const getUserInfo = asyncActionCreator(getUserInfoActions, queryUsersInfo);
let initialLoginState = {};
function getUserInfoReducer(state = initialLoginState, { type, payload }) {
    switch (type) {
        case USER_INFOS_REQUEST:
            return Object.assign({}, state, {
                ...payload
            });
        case USER_INFOS_SUCCESS:
            return Object.assign({}, state, {
                ...payload.user
            });
        case USER_INFOS_FAILURE:
            return Object.assign({}, state, {
                ...payload
            });
        default:
            return state;
    }
}

export default getUserInfoReducer;
