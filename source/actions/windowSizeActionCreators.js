import { WINDOW_SIZE }  from './actionTypes.js';

export const recordWindowSize = (width, height) => 
    ({ type: WINDOW_SIZE , payload: { width, height }});




