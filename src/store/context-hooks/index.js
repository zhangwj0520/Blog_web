import React, { useReducer } from 'react';

const initialState = {
    tags: [],
    artTypes: []
};
const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'setTags':
            return { ...state, ...payload };
        default:
            return state;
    }
};

const context = React.createContext();

const Provider = props => {
    const [globalState, origin_dispatch] = useReducer(reducer, initialState);
    const dispatch = action => {
        if (typeof action === 'function') {
            return action(origin_dispatch);
        }
        return origin_dispatch(action);
    };
    return <context.Provider value={{ globalState, dispatch }}>{props.children}</context.Provider>;
};

export { Provider, context };
