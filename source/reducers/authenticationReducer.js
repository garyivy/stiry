import {
    SIGNIN_REQUEST,
    SIGNIN_RESPONSE,
    SIGNOUT,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_RESPONSE,
} from './../actions/actionTypes.js';

const initialState = {
    displayName: null,
    isGuest: true,
    isAuthorized: false,
    error: null
}

const authenticationReducer = (state = initialState, { type, payload, error }) => {
    switch (type) {
        case SIGNIN_REQUEST:
            return initialState;
            
        case SIGNIN_RESPONSE:
            return error
                ? { ...initialState, error }
                : {
                    isAuthorized: true,
                    displayName: payload.displayName,
                    isGuest: payload.isGuest
                }

        case SIGNOUT:
            return initialState;

        case RESET_PASSWORD_REQUEST:
            return initialState;
        case RESET_PASSWORD_RESPONSE:
            return initialState; // Not really needed since reset response is communicted by email.

        default:
            return state;
    }
}

export default authenticationReducer;