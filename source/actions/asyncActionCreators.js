import * as actionTypes from './actionTypes.js';
import { requestRedirect, receivedCollaborationStatus } from './syncActionCreators.js';
import { get, post } from './../shared/api.js';

import { apiCallCreator } from './apiCallCreator.js';
const apiPath = 'api/';

const signinPost = apiCallCreator('post', 'signin', false);
// Note: Thunk middleware (injected during createStore) provides dispatch and getState
// whenever an action creator has a function signature.
// This allows us to, in part, to dispatch an action after an asynchronous call completes.

const apiHelper = (dispatch, promise) => {
    dispatch({ type: actionTypes.API_CALL_STARTED });
    promise.then(() => { console.log('111111111111111'); dispatch({ type: actionTypes.API_CALL_FINISHED }) });
    promise.catch((error) => {
        console.log('ERROR CAUGHT IN apiHelper');
        console.log(error);
        dispatch({ type: actionTypes.API_CALL_FINISHED });
    });
    return promise;
}

// Note: action property names are following FLux Standard Action recommendation.
// However, we are deviating from how it recommends the error boolean property and 
// overloading the payload with an Error.  Instead, when there are error(s), the
// error property will be set to an string/object and payload will be null.
// In this way, error will still provide a truthy check.


const handleSigninResult = (dispatch, promise, redirectPath, errorMessage) => {
    apiHelper(dispatch, promise);

    promise.then((response) => {
        console.log('DDDDDDDDDDDDDDDDDDDDDDdd');
        console.log(response);
        let result = response.data;
        if (result && result.sessionToken) {
            localStorage.setItem('sessionToken', result.sessionToken);
            dispatch({
                type: actionTypes.SIGNIN,
                payload: {
                    displayName: result.displayName,
                    sessionToken: result.sessionToken,
                    isAuthorized: true
                }
            });
            dispatch(requestRedirect(redirectPath));
        } else {
            localStorage.removeItem('sessionToken');
            dispatch({
                type: actionTypes.SIGNIN,
                error: errorMessage
            });
        }
    });//.catch((e) => { console.log('gggggggggggggg');});
}

const buildAuthorizationHeader = () => {
    return { headers: { 'authorization': localStorage.getItem('sessionToken') } }
}

export const signin = (userName, password, redirectPath = '/') => {
    return (dispatch, getState) => {
        let errorMessage = 'Invalid User Name or Password.';
        let promise = signinPost(dispatch, { userName, password });
        promise.then(result => {
            if (result.payload && result.payload.sessionToken) {
                dispatch({
                    type: actionTypes.SIGNIN,
                    payload: {
                        displayName: result.payload.displayName,
                        sessionToken: result.payload.sessionToken,
                        isAuthorized: true
                    }
                });
                dispatch(requestRedirect(redirectPath));
            } else {
                dispatch({
                    type: actionTypes.SIGNIN,
                    error: errorMessage
                });
            }
        });
        
        //let promise = axios.post(apiPath + 'signin', { userName, password });
        //handleSigninResult(dispatch, promise, redirectPath, 'Invalid User Name or Password.');
    };
}

export const registerUser = (userName, email, password) => {
    return (dispatch, getState) => {
        let promise = axios.post(apiPath + 'users', { userName, email, password }, { validateStatus: () => true });
        handleSigninResult(dispatch, promise, '/', 'Unable to register user.');
    };
}

export const resetPassword = (resetToken, password) => {
    return (dispatch, getState) => {
        let promise = post('reset', { resetToken, password }, { validateStatus: () => true });
        handleSigninResult(dispatch, promise, '/', 'Unable to reset password.');
    };
}

export const forgotPassword = (email) => {
    return (dispatch, getState) => {
        let promise = post('forgot', { email });

        apiHelper(dispatch, promise);
        promise.then((result) => {
            //  TODO: Have server email the resetLink and show a message instead :)
            dispatch({ type: actionTypes.FORGOT_PASSWORD, payload: { resetLink: result.resetLink } });
        });
    };
}

export const submitQuestionnaire = () => {
    return (dispatch, getState) => {
        let promise = post('questionnaires', getState().questionnaire);

        apiHelper(dispatch, promise).then((result) => {
            if (result && result.message == 'Questionnaire saved.') {
                dispatch(requestRedirect('/wait'));
            }
        });
    }
}

export const requestCollaborationStatus = () => {
    return (dispatch, getState) => {
        let collaborationToken = getState().questionnaire.collaborationToken;
        let promise = get('collaborationStatus/' + collaborationToken);

        apiHelper(dispatch, promise).then((status) => {
            dispatch(receivedCollaborationStatus(status));
        });
    }
}