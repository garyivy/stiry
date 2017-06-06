import * as actionTypes from './actionTypes.js';
import { post } from './../shared/api.js';

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
    return (dispatch, getState) => {
        post('questionnaires', getState().questionnaire).then((result) => {
            console.log(result);
        });
    }
}



