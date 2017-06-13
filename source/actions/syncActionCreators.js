import * as actionTypes from './actionTypes.js';

export const signinComplete = userDisplayName => 
    ({ type: actionTypes.SIGNIN_COMPLETE, userDisplayName });

export const signinError = message => 
    ({ type: actionTypes.SIGNIN_COMPLETE, message });

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

export const receivedCollaborationStatus = (status) => 
    ({ type: actionTypes.RECEIVED_COLLABORATION_STATUS, payload: {status}});

export const requestRedirect = (url) => 
    ({ type: actionTypes.REQUEST_REDIRECT, payload: { url }});

export const resetRedirect = () => 
    ({ type: actionTypes.RESET_REDIRECT});

export const receivedScrambledResult = (answers) => 
    ({ type: actionTypes.RECEIVED_SCRAMBLED_RESULT, payload: { answers }});



