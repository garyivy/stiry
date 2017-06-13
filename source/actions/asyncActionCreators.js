import * as actionTypes from './actionTypes.js';
import { requestRedirect, receivedCollaborationStatus } from './syncActionCreators.js';
import { apiCallCreator } from './apiCallCreator.js'

// Note: Thunk middleware (injected during createStore) provides dispatch and getState
// whenever an action creator has a function signature.
// This allows us to, in part, to dispatch an action after an asynchronous call completes.

// Note: action property names are following FLux Standard Action recommendation.
// However, we are deviating from how it recommends the error boolean property and 
// overloading the payload with an Error.  Instead, when there are error(s), the
// error property will be set to an string/object and payload will be null.
// In this way, error will still provide a truthy check.

export const signin = (userName, password, redirectPath = '/') => {
    return (dispatch, getState) => {
        let promise = signinPost(dispatch, { userName, password });
        handleSigninResult(dispatch, promise, redirectPath, 'Invalid User Name or Password.')
    };
}

export const registerUser = (userName, email, password) => {
    return (dispatch, getState) => {
        let promise = registerUserPost(dispatch, { userName, email, password });
        handleSigninResult(dispatch, promise, '/', 'Unable to register user.');
    };
}

export const resetPassword = (resetToken, password) => {
    return (dispatch, getState) => {
        let promise = resetPasswordPost(dispatch, { resetToken, password });
        handleSigninResult(dispatch, promise, '/', 'Unable to reset password.');
    };
}

export const forgotPassword = (email) => {
    return (dispatch, getState) => {
        forgotPasswordPost(dispatch, { email }).then(result => 
            dispatch({ type: actionTypes.FORGOT_PASSWORD, ...result }))
    }
}

export const startCollaboration = collaborationName => {
    return dispatch => {
        startCollaborationPost(dispatch, { collaborationName }).then(result => {
            result.payload.collaborationToken && requestRedirect('/questionnaire');
            dispatch({ type: actionTypes.START_COLLABORATION, ...result });
        })   
    }
}

export const joinCollaboration = collaborationName => {
    return dispatch => {
        joinCollaborationPost(dispatch, { collaborationName }).then(result => {
            result.payload.collaborationToken && requestRedirect('/questionnaire');
            dispatch({ type: actionTypes.JOIN_COLLABORATION, ...result });
        })   
    }
}

export const submitQuestionnaire = () => {
    return (dispatch, getState) => {
        let questionnaire = getState().questionnaire;
        submitQuestionnairePost(dispatch, questionnaire).then(result => {
            if (result && result.message == 'Questionnaire saved.') {
                dispatch(requestRedirect('/wait'));
            }
        });
    }
}

export const requestCollaborationStatus = () => {
    return (dispatch, getState) => {
        let collaborationToken = getState().questionnaire.collaborationToken;
        collaborationStatusGet(dispatch, collaborationToken).then(result => {
            dispatch(receivedCollaborationStatus(result.payload));
        })
    }
}

const signinPost = apiCallCreator('post', 'signin', false);
const registerUserPost = apiCallCreator('post', 'users', false);
const forgotPasswordPost = apiCallCreator('post', 'forgot', false);
const resetPasswordPost = apiCallCreator('post', 'reset', false);

const startCollaborationPost = apiCallCreator('post', 'start');
const joinCollaborationPost = apiCallCreator('post', 'join');
const submitQuestionnairePost = apiCallCreator('post', 'questionnaires');
const collaborationStatusGet = apiCallCreator('get', 'collaborationStatus');

const handleSigninResult = (dispatch, promise, redirectPath, errorMessage) => {
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
}

