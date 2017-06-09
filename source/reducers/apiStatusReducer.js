import * as actionTypes from './../actions/actionTypes.js';

const initialState = {
    countRequestsInProgress: 0
};

const apiStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.API_CALL_STARTED:
            return { countRequestsInProgress: state.countRequestsInProgress + 1};
        case actionTypes.API_CALL_FINISHED:
            let countRequestsInProgress = state.countRequestsInProgress > 0 
                ? state.countRequestsInProgress - 1
                : 0;
            return { countRequestsInProgress };
        default:
            return state;
    }
}

export default apiStatusReducer;