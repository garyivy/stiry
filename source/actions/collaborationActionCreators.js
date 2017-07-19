import {
    RECORD_ANSWER,
    AUTO_PICK_ANSWER,
    GOTO_PREVIOUS_QUESTION,
    GOTO_NEXT_QUESTION,
    START_COLLABORATION,
    JOIN_COLLABORATION,
    GET_COLLABORATION_STATUS,
    GET_SCRAMBLED_RESULT,
    SIGNIN
} from './actionTypes.js';

import { requestRedirect } from './redirectUrlActionCreators.js';
import { createApiCall } from './apiHelpeR.js'; // TODO: Figure why using the same name in authenticationActionCreators.js is confusing webpack.

// Note: action property names are following FLux Standard Action recommendation.
// However, we are deviating from how it recommends the error boolean property and 
// overloading the payload with an Error.  Instead, when there are error(s), the
// error property will be set to an string/object and payload will be null.
// In this way, error will still provide a truthy check.

export const recordAnswer = (answer) =>
    ({ type: RECORD_ANSWER, payload: { answer } });

export const autoPickAnswer = () =>
    ({ type: AUTO_PICK_ANSWER });

export const gotoPreviousQuestion = () =>
    ({ type: GOTO_PREVIOUS_QUESTION });

export const gotoNextQuestion = () =>
    ({ type: GOTO_NEXT_QUESTION });

// Note: Thunk middleware (injected during createStore) provides dispatch and getState
// whenever an action creator has a function signature.
// This allows us to, in part, to dispatch an action after an asynchronous call completes.

const startCollaborationPost = createApiCall('post', 'start');
const joinCollaborationPost = createApiCall('post', 'join');
const joinCollaborationAsGuestPost = createApiCall('post', 'guest', false);
const submitQuestionnairePost = createApiCall('post', 'questionnaires');
const collaborationStatusGet = createApiCall('get', 'collaborationStatus');
const scrambledGet = createApiCall('get', 'scrambled');

export const startCollaboration = collaborationName => {
    return dispatch => {
        startCollaborationPost(dispatch, { collaborationName }).then(result => {
            // Note: START_COLLABORATION must happen before requestRedirect so ColloborationRoute has a collaborationToken
            dispatch({ type: START_COLLABORATION, ...result });
            result.payload.collaborationToken && dispatch(requestRedirect('/questionnaire'));
        })
    }
}

export const joinCollaboration = collaborationName => {
    return dispatch => {
        joinCollaborationPost(dispatch, { collaborationName }).then(result => {
            dispatch({ type: JOIN_COLLABORATION, ...result });
            result.payload.collaborationToken && dispatch(requestRedirect('/questionnaire'));
        })
    }
}

export const joinCollaborationAsGuest = collaborationName => {
    return dispatch => {
        joinCollaborationAsGuestPost(dispatch, { collaborationName }).then(result => {
            dispatch({ type: JOIN_COLLABORATION, ...result });
            // TODO: Handle failure 
            dispatch({
                type: SIGNIN,
                payload: {
                    displayName: 'Guest User',
                    isAuthorized: true
                }
            });
            result.payload.collaborationToken && dispatch(requestRedirect('/questionnaire'));
        })
    }
}

export const submitQuestionnaire = () => {
    return (dispatch, getState) => {
        let collaboration = getState().collaboration;
        submitQuestionnairePost(dispatch, collaboration).then(result => {
            if (result.payload.message == 'Questionnaire saved.') {
                dispatch(requestRedirect('/wait'));
            }
        });
    }
}

export const getCollaborationStatus = () => {
    return (dispatch, getState) => {
        let collaborationToken = getState().collaboration.collaborationToken;
        collaborationStatusGet(dispatch, collaborationToken).then(result => {
            dispatch({ type: GET_COLLABORATION_STATUS, ...result });
        })
    }
}

export const getScrambledResult = () => {
    return (dispatch, getState) => {
        let collaborationToken = getState().collaboration.collaborationToken;
        scrambledGet(dispatch, collaborationToken).then(result => {
            dispatch({ type: GET_SCRAMBLED_RESULT, ...result });
            dispatch(requestRedirect('/scrambled'));
        })
    }
}

