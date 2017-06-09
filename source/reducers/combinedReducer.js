import { combineReducers } from 'redux';
import userReducer from './userReducer.js';
import questionnaireReducer from './questionnaireReducer.js';
import scrambledReducer from './scrambledReducer.js';
import redirectReducer from './redirectReducer.js';
import apiStatusReducer from './apiStatusReducer.js';

const combinedReducer = combineReducers({
    user:           userReducer, 
    questionnaire:  questionnaireReducer,
    scrambled:      scrambledReducer,
    redirectUrl:    redirectReducer,
    apiStatus:      apiStatusReducer
});

export default combinedReducer;