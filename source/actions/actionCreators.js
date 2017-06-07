import * as actionTypes from './actionTypes.js';
import { get, post } from './../shared/api.js';

export const signinComplete = userDisplayName => 
    ({ type: actionTypes.SIGNIN_COMPLETE, userDisplayName });

export const startedCollaboration = (collaborationName, collaborationToken) =>
    ({ type: actionTypes.STARTED_COLLABORATION, payload: { collaborationName, collaborationToken }});

export const joinedCollaboration = (collaborationName, collaborationToken) =>
    ({ type: actionTypes.JOINED_COLLABORATION, payload: { collaborationName, collaborationToken }});

export const recordAnswer = (answer) =>
    ({ type: actionTypes.RECORD_ANSWER, answer});

export const gotoPreviousQuestion = () => 
    ({ type: actionTypes.GOTO_PREVIOUS_QUESTION});

export const gotoNextQuestion = () => 
    ({ type: actionTypes.GOTO_NEXT_QUESTION});

export const submitQuestionnaire = () => {
    // Note: Thunk middleware provided dispatch and getState whenever an action creator has a function signature
    // This is useful for things like asynchronys api calls
    return (dispatch, getState) => {
        post('questionnaires', getState().questionnaire).then((result) => {
            console.log(result);
            if(result && result.message == 'Questionnaire saved.') {
                dispatch(requestRedirect('/wait'));
            }
        });
    }
}

export const requestCollaborationStatus = () => {
    return (dispatch, getState) => {
        let collaborationToken = getState().questionnaire.collaborationToken;
        get('collaborationStatus/'+ collaborationToken).then((result) => {
            console.log(result);
        });
    }
}

export const requestRedirect = (url) => 
    ({ type: actionTypes.REQUEST_REDIRECT, payload: { url }});

export const resetRedirect = () => 
    ({ type: actionTypes.RESET_REDIRECT});

export const receivedScrambledResult = (answers) => 
    ({ type: actionTypes.RECEIVED_SCRAMBLED_RESULT, payload: { answers }});



