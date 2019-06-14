import { fetchData, checkDataStatus } from '../../common/utils';

const COMMONDATA_REQUEST = 'COMMONDATA_REQUEST';
const COMMONDATA_SUCCESS = 'COMMONDATA_SUCCESS';
const COMMONDATA_FAILURE = 'COMMONDATA_FAILURE';

let initialTagState = { tags: [], artTypes: [] };
function getCommonDataReducer(state = initialTagState, { type, payload }) {
    switch (type) {
        case COMMONDATA_REQUEST:
            return Object.assign({}, state, {
                ...payload
            });
        case COMMONDATA_SUCCESS:
            return Object.assign({}, state, {
                ...payload
            });
        case COMMONDATA_FAILURE:
            return Object.assign({}, state, {
                ...payload
            });
        default:
            return state;
    }
}
export const getCommonData = dispatch => {
    dispatch({
        type: COMMONDATA_REQUEST
    });
    const fetchTag = fetchData('/blog/tags')
        .then(res => {
            if (checkDataStatus(res)) {
                return res.data;
            }
        })
        .catch(function(error) {
            dispatch({
                type: COMMONDATA_FAILURE
            });
        });

    const fetchTypes = fetchData('/blog/types')
        .then(res => {
            if (checkDataStatus(res)) {
                return res.data;
            }
        })
        .catch(function(error) {
            dispatch({
                type: COMMONDATA_FAILURE
            });
        });
    Promise.all([fetchTag, fetchTypes])
        .then(([tags, artTypes]) => {
            dispatch({ type: COMMONDATA_SUCCESS, payload: { tags, artTypes } });
        })
        .catch(e => console.log(e));
};

export default getCommonDataReducer;
