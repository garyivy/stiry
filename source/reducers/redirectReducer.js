import { isNullOrWhitespace } from './../shared/utilities.js';
import * as actionTypes from './../actions/actionTypes.js';

// HACK: This reducer works with the App's Redirector component to handled a dispatched REQUEST_REDIRECT action.
// TODO: Revisit once react-router-redux version 5 is out of beta.

const redirectReducer = (redirectUrl = null, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_REDIRECT:
            return action.payload.url;
        case actionTypes.RESET_REDIRECT:
            return null
        default:
            return redirectUrl;
    }
}

export default redirectReducer;