import { WINDOW_RESIZED }  from './actionTypes.js';

export const recordWindowSize = (width, height) => 
    ({ type: WINDOW_RESIZED , payload: { width, height }});




