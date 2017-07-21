import * as actionTypes from './../actions/actionTypes.js';

const initialState = {
    displayName: null,
    isGuest: false,
    isAuthorized: false
}

const authenticationReducer = (state = initialState, { type, payload, error })  => {
    switch (type) {
        case actionTypes.SIGNIN: 
            return error
                ? { ...initialState, error }
                : { 
                    isAuthorized: true,
                    displayName: payload.displayName,
                    isGuest: payload.isGuest,
                    resetLink: null
                 } 

        case actionTypes.SIGNOUT:
            return initialState;

        case actionTypes.FORGOT_PASSWORD:
            return { ...initialState };

        default:
            return state;
    }
}

export default authenticationReducer;