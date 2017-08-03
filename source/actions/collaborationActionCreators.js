import {
    START_COLLABORATION_REQUEST,
    START_COLLABORATION_RESPONSE,
    JOIN_COLLABORATION_REQUEST,
    JOIN_COLLABORATION_RESPONSE,
    RECORD_ANSWER,
    AUTO_PICK_ANSWER,
    GOTO_PREVIOUS_QUESTION,
    GOTO_NEXT_QUESTION,
    SUBMIT_QUESTIONNAIRE_REQUEST,
    SUBMIT_QUESTIONNAIRE_RESPONSE,
    GET_COLLABORATION_STATUS_REQUEST,
    GET_COLLABORATION_STATUS_RESPONSE,
    FORCE_COLLABORATION_END_REQUEST,
    FORCE_COLLABORATION_END_RESPONSE,
    FORCED_COLLABORATION_END,
    GET_SCRAMBLED_REQUEST,
    GET_SCRAMBLED_RESPONSE,
    SIGNIN
} from './actionTypes.js';

import { requestRedirect } from './redirectUrlActionCreators.js';
import { createApiCall } from './apiHelpeR.js'; // TODO: Figure why using the same name in authenticationActionCreators.js is confusing webpack.

// Design Notes:
// Thunk middleware (injected during createStore) provides dispatch and getState
// whenever an action creator has a function signature.
// This allows us to, in part, to dispatch an action after an asynchronous call completes.

// Action property names are following FLux Standard Action recommendation.
// However, we are deviating from how it recommends the error boolean property and 
// overloading the payload with an Error.  Instead, when there are error(s), the
// error property will be set to an string/object and payload will be null.
// In this way, error will still provide a truthy check.

const startCollaborationPost = createApiCall('post', 'start');
const joinCollaborationPost = createApiCall('post', 'join');
const joinCollaborationAsGuestPost = createApiCall('post', 'guest', false);
const submitQuestionnairePost = createApiCall('post', 'questionnaires');
const collaborationStatusGet = createApiCall('get', 'collaborationStatus');
const scrambledGet = createApiCall('get', 'scrambled');
const forceCollaborationPost = createApiCall('post', 'force');

export const startCollaboration = () => {
    return dispatch => {
        dispatch({ type: START_COLLABORATION_REQUEST });
        startCollaborationPost(dispatch, { collaborationName: 'TODO-DEPRECATED' }).then(result => {
            // Note: START_COLLABORATION_RESPONSE must happen before requestRedirect so ColloborationRoute has a collaborationToken
            dispatch({ type: START_COLLABORATION_RESPONSE, payload: result.payload, error: result.error });
            result.payload.collaborationToken && dispatch(requestRedirect('/questionnaire'));
        })
    }
}

export const joinCollaboration = collaborationName => {
    return dispatch => {
        dispatch({ type: JOIN_COLLABORATION_REQUEST });
        joinCollaborationPost(dispatch, { collaborationName }).then(result => {
            dispatch({ type: JOIN_COLLABORATION_RESPONSE, payload: result.payload, error: result.error });
            result.payload.collaborationToken && dispatch(requestRedirect('/questionnaire'));
        })
    }
}

export const joinCollaborationAsGuest = collaborationCode => {
    return dispatch => {
        // TODO: Refactor and/or document how this relates to non-guest authentication.
        dispatch({ type: JOIN_COLLABORATION_REQUEST });
        joinCollaborationAsGuestPost(dispatch, { collaborationName: collaborationCode }).then(result => {
            dispatch({ type: JOIN_COLLABORATION_RESPONSE, payload: result.payload, error: result.error });
            if (result.payload.collaborationToken) {
                dispatch({
                    type: SIGNIN,
                    payload: {
                        displayName: 'Guest User',
                        isAuthorized: true,
                        isGuest: true
                    }
                });
                dispatch(requestRedirect('/questionnaire'));
            }
        })
    }
}

export const recordAnswer = (answer) =>
    ({ type: RECORD_ANSWER, payload: { answer } });

export const autoPickAnswer = () =>
    ({ type: AUTO_PICK_ANSWER });

export const gotoPreviousQuestion = () =>
    ({ type: GOTO_PREVIOUS_QUESTION });

export const gotoNextQuestion = () =>
    ({ type: GOTO_NEXT_QUESTION });

export const submitQuestionnaire = () => {
    return (dispatch, getState) => {
        dispatch({ type: SUBMIT_QUESTIONNAIRE_REQUEST });
        let collaboration = getState().collaboration;
        submitQuestionnairePost(dispatch, collaboration).then(result => {
            dispatch({ type: SUBMIT_QUESTIONNAIRE_RESPONSE, payload: result.payload, error: result.error });
            !result.error && dispatch(requestRedirect('/wait'));
        });
    }
}

export const getCollaborationStatus = () => {
    return (dispatch, getState) => {
        dispatch({ type: GET_COLLABORATION_STATUS_REQUEST });
        let collaborationToken = getState().collaboration.collaborationToken;
        collaborationStatusGet(dispatch, collaborationToken).then(result => {
            dispatch({ type: GET_COLLABORATION_STATUS_RESPONSE, payload: result.payload, error: result.error});
        })
    }
}

export const forceCollaborationEnd = () => {
    return (dispatch, getState) => {
        dispatch({ type: FORCE_COLLABORATION_END_REQUEST });        
        let collaboration = getState().collaboration;
        forceCollaborationPost(dispatch, collaboration).then(result => {
            dispatch({ type: FORCE_COLLABORATION_END_RESPONSE, payload: result.payload, error: result.error });        
        });
    }
}

export const getScrambledResult = () => {
    return (dispatch, getState) => {
        dispatch({ type: GET_SCRAMBLED_REQUEST });       
        let collaborationToken = getState().collaboration.collaborationToken;
        scrambledGet(dispatch, collaborationToken).then(result => {
            dispatch({ type: GET_SCRAMBLED_RESPONSE, payload: result.payload, error: result.error });       
            !result.error && dispatch(requestRedirect('/scrambled'));
        })
    }
}

