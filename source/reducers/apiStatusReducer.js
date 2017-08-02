import { API_CALL_STARTED, API_CALL_FINISHED }  from './../actions/actionTypes.js';

const initialState = {
    countRequestsInProgress: 0
};

const apiStatusReducer = (state = initialState, {type}) => {
    switch (type) {
        case API_CALL_STARTED:
            return { countRequestsInProgress: state.countRequestsInProgress + 1 };

        case API_CALL_FINISHED:
            return {
                countRequestsInProgress: state.countRequestsInProgress > 0
                    ?  state.countRequestsInProgress - 1
                    : 0
            }

        default:
            return state;
    }
}

export default apiStatusReducer;