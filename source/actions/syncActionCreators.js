import * as actionTypes from './actionTypes.js';

export const requestRedirect = (url) => 
    ({ type: actionTypes.REQUEST_REDIRECT, payload: { url }});

export const resetRedirect = () => 
    ({ type: actionTypes.RESET_REDIRECT});

export const recordAnswer = (answer) =>
    ({ type: actionTypes.RECORD_ANSWER, payload: {answer}});

export const gotoPreviousQuestion = () => 
    ({ type: actionTypes.GOTO_PREVIOUS_QUESTION});

export const gotoNextQuestion = () => 
    ({ type: actionTypes.GOTO_NEXT_QUESTION});



