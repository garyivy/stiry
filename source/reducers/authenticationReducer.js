import * as actionTypes from './../actions/actionTypes.js';

const initialState = {
    displayName: null,
    isAuthorized: false,
    resetLink: null
}

const authenticationReducer = (state = initialState, { type, payload, error })  => {
    switch (type) {
        case actionTypes.SIGNIN: 
            return error
                ? { ...initialState, error }
                : { 
                    displayName: payload.displayName,
                    isAuthorized: true,
                    resetLink: null
                 } 

        case actionTypes.SIGNOUT:
            return initialState;

        case actionTypes.FORGOT_PASSWORD:
            return { ...initialState,  resetLink: payload.resetLink };

        default:
            return state;
    }
}

export default authenticationReducer;