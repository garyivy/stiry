import { REQUEST_REDIRECT, RESET_REDIRECT }  from './actionTypes.js';

export const requestRedirect = (url) => 
    ({ type: REQUEST_REDIRECT, payload: { url }});

export const resetRedirect = () => 
    ({ type: RESET_REDIRECT});



