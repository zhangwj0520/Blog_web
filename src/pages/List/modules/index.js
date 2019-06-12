import {combineReducers} from 'redux';
import {postListData} from '../../../api/list';
import {asyncActionCreator} from '../../../utils/utils';

// submit
const GET_LIST_DATA_REQUEST = 'GET_LIST_DATA_REQUEST';
const GET_LIST_DATA_SUCCESS = 'GET_LIST_DATA_SUCCESS';
const GET_LIST_DATA_FAILURE = 'GET_LIST_DATA_FAILURE';

const getListDataActions = {
    request: GET_LIST_DATA_REQUEST,
    success: GET_LIST_DATA_SUCCESS,
    failure: GET_LIST_DATA_FAILURE
};
export const getListData = asyncActionCreator(getListDataActions, postListData);

let initialListState = {isLoading: false, data: {}};
function listDataReducer(state = initialListState, {type, payload}) {
    switch (type) {
        case GET_LIST_DATA_REQUEST:
            return Object.assign({}, state, {
                ...payload
            });
        case GET_LIST_DATA_SUCCESS:
            return Object.assign({}, state, {
                ...payload
            });
        case GET_LIST_DATA_FAILURE:
            return Object.assign({}, state, {
                ...payload
            });
        default:
            return state;
    }
}

const listreducer = combineReducers({
    listDataReducer
});
listreducer.reducer = 'listreducer';

export default listreducer;
