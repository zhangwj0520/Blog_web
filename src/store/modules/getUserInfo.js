//从ls更新用户信息
const USER_INFOS_UPDATE = 'USER_INFOS_UPDATE';

const { identity, phoneNumber, userName } = localStorage;
let initialUserInfoState = { identity, phoneNumber, userName };
function getUserInfoReducer(state = initialUserInfoState, { type, payload }) {
    switch (type) {
        case USER_INFOS_UPDATE:
            const { identity, phoneNumber, userName } = localStorage;
            return { identity, phoneNumber, userName };
        default:
            return state;
    }
}

export default getUserInfoReducer;
