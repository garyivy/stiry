import { isNullOrWhitespace } from './../shared/utilities.js';
import * as actionTypes from './../actions/actionTypes.js';

const initialState = {
    isAuthorizedUser: false,
    userDisplayName: null,
};

const userReducer = (state = initialState, action) => {
    // TODO: Use destructuring as shorthand to Object.assign.
    switch (action.type) {
        case actionTypes.SIGNIN_COMPLETE:
            console.log(action);
            return Object.assign({}, state, { userDisplayName: action.userDisplayName, isAuthorizedUser: true });
        case actionTypes.SIGNOUT:
            return Object.assign({}, state, { userName: '', isAuthorizedUser: false });
        default:
            return state;
    }
}

export default userReducer;