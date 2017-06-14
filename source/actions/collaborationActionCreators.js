import * as actionTypes from './actionTypes.js';
import { requestRedirect } from './redirectUrlActionCreators.js';
import { createApiCall } from './createApiCall.js'

// Note: Thunk middleware (injected during createStore) provides dispatch and getState
// whenever an action creator has a function signature.
// This allows us to, in part, to dispatch an action after an asynchronous call completes.

// Note: action property names are following FLux Standard Action recommendation.
// However, we are deviating from how it recommends the error boolean property and 
// overloading the payload with an Error.  Instead, when there are error(s), the
// error property will be set to an string/object and payload will be null.
// In this way, error will still provide a truthy check.

export const recordAnswer = (answer) =>
    ({ type: actionTypes.RECORD_ANSWER, payload: {answer}});

export const gotoPreviousQuestion = () => 
    ({ type: actionTypes.GOTO_PREVIOUS_QUESTION});

export const gotoNextQuestion = () => 
    ({ type: actionTypes.GOTO_NEXT_QUESTION});

const startCollaborationPost = createApiCall('post', 'start');
const joinCollaborationPost = createApiCall('post', 'join');
const submitQuestionnairePost = createApiCall('post', 'questionnaires');
const collaborationStatusGet = createApiCall('get', 'collaborationStatus');

export const startCollaboration = collaborationName => {
    return dispatch => {
        startCollaborationPost(dispatch, { collaborationName }).then(result => {
            result.payload.collaborationToken && dispatch(requestRedirect('/questionnaire'));
            dispatch({ type: actionTypes.START_COLLABORATION, ...result });
        })   
    }
}

export const joinCollaboration = collaborationName => {
    return dispatch => {
        joinCollaborationPost(dispatch, { collaborationName }).then(result => {
            result.payload.collaborationToken && dispatch(requestRedirect('/questionnaire'));
            dispatch({ type: actionTypes.JOIN_COLLABORATION, ...result });
        })   
    }
}

export const submitQuestionnaire = () => {
    return (dispatch, getState) => {
        let collaboration = getState().collaboration;
        submitQuestionnairePost(dispatch, collaboration).then(result => {
            console.log(result);
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
            dispatch({ type: actionTypes.GET_COLLABORATION_STATUS, ...result });
        })
    }
}

