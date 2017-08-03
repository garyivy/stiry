import {API_CALL_STARTED, API_CALL_FINISHED} from './actionTypes.js';

export const apiStarted = () => 
    ({ type: API_CALL_STARTED })

export const apiFinished = () => 
    ({ type: API_CALL_FINISHED })



