import * as actionTypes from './../actions/actionTypes.js';

const userReducer = (state = {}, { type, payload, error })  => {
    // TODO: Rethink action type naming
    switch (type) {
        case actionTypes.SIGNIN: // Server has authenticated user
            return error
                ? { error }
                : { ...payload } // displayName, isAuthorized, sessionToken
        case actionTypes.SIGNOUT:
            return {};
        case actionTypes.FORGOT_PASSWORD:
            return { resetLink: payload.resetLink };
        default:
            return state;
    }
}

export default userReducer;