import { isNullOrWhitespace } from './../shared/utilities.js';
import * as actionTypes from './../actions/actionTypes.js';

// HACK: This reducer works with the App's Redirector component to handled a dispatched REQUEST_REDIRECT action.
// TODO: Revisit once react-router-redux version 5 is out of beta.

const redirectReducer = (redirectUrl = null, {type, payload }) => {
    switch (type) {
        case actionTypes.REQUEST_REDIRECT:
            console.log('Redirecting to ' + payload.url);
            return payload.url;
        case actionTypes.RESET_REDIRECT:
            return null
        default:
            return redirectUrl;
    }
}

export default redirectReducer;