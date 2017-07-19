import { SIGNIN, SIGNOUT, FORGOT_PASSWORD } from './actionTypes.js';
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
        dispatch( {type: SIGNOUT});
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
        forgotPasswordPost(dispatch, { email }).then(result =>
            dispatch({ type: FORGOT_PASSWORD, ...result }))
    }
}

const handleAuthenticationResult = (dispatch, promise, redirectPath, errorMessage) => {
    promise.then(({payload}) => {
        if (payload && payload.userDisplayName) {
            dispatch({
                type: SIGNIN,
                payload: {
                    displayName: payload.userDisplayName,
                    isAuthorized: true
                }
            });

            dispatch(requestRedirect(redirectPath));
        } else {
            dispatch({
                type: SIGNIN,
                error: errorMessage
            });
        }
    });
}

