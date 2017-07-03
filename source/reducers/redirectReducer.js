import { REQUEST_REDIRECT, RESET_REDIRECT } from './../actions/actionTypes.js';

// HACK: This reducer works with the App's Redirector component to handled a dispatched REQUEST_REDIRECT action.
// TODO: Revisit once react-router-redux version 5 is out of beta.

const redirectReducer = (redirectUrl = null, { type, payload}) => {
    switch (type) {
        case REQUEST_REDIRECT:
            return payload.url;

        case RESET_REDIRECT:
            return null

        default:
            return redirectUrl;
    }
}

export default redirectReducer;