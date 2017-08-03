import {
    SIGNIN_REQUEST,
    SIGNIN_RESPONSE,
    SIGNOUT,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_RESPONSE,
} from './actionTypes.js';
import { requestRedirect } from './redirectUrlActionCreators.js';
import { createApiCall } from './apiHelper.js';

const signinPost = createApiCall('post', 'signin', false);
const registerUserPost = createApiCall('post', 'users', false);
const forgotPasswordPost = createApiCall('post', 'forgot', false);
const resetPasswordPost = createApiCall('post', 'reset', false);

export const signin = (userName, password, redirectPath = '/') => {
    return (dispatch, getState) => {
        let promise = signinPost(dispatch, { userName, password });
        handleAuthenticationResult(dispatch, promise, redirectPath, 'Invalid User Name or Password.')
    };
}

export const signout = () => {
    return (dispatch, getState) => {
        // TODO: Perhaps refactor so the setting and removing happen in the same place.
        localStorage.removeItem('sessionToken');
        dispatch({ type: SIGNOUT });
    }
}

export const registerUser = (userName, email, password) => {
    return (dispatch, getState) => {
        let promise = registerUserPost(dispatch, { userName, email, password });
        handleAuthenticationResult(dispatch, promise, '/', 'Unable to register user.');
    };
}

export const resetPassword = (resetToken, password) => {
    return (dispatch, getState) => {
        let promise = resetPasswordPost(dispatch, { resetToken, password });
        handleAuthenticationResult(dispatch, promise, '/', 'Unable to reset password.');
    };
}

export const forgotPassword = (email) => {
    return (dispatch, getState) => {
        dispatch({ type: RESET_PASSWORD_RESPONSE });
        forgotPasswordPost(dispatch, { email }).then(result =>
            dispatch({ type: RESET_PASSWORD_RESPONSE, ...result }))
    }
}

const handleAuthenticationResult = (dispatch, promise, redirectPath, errorMessage) => {
    dispatch({ type: SIGNIN_REQUEST });
    promise.then(({ payload }) => {
        let wasAuthenticationSuccessful = payload && payload.userDisplayName;
        
        let translatedPayload = wasAuthenticationSuccessful
            ? { displayName: payload.userDisplayName, isAuthorized: true }
            : null;

        dispatch({
            type: SIGNIN_RESPONSE,
            payload: wasAuthenticationSuccessful ? { displayName: payload.userDisplayName, isAuthorized: true } : null, 
            error: wasAuthenticationSuccessful ? null : errorMessage
        });

        dispatch(requestRedirect(redirectPath));
    });
}

