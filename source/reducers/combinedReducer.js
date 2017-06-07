import { combineReducers } from 'redux';
import userReducer from './userReducer.js';
import questionnaireReducer from './questionnaireReducer.js';
import scrambledReducer from './scrambledReducer.js';
import redirectReducer from './redirectReducer.js';

const combinedReducer = combineReducers({
    user:           userReducer, 
    questionnaire:  questionnaireReducer,
    scrambled:      scrambledReducer,
    redirectUrl:    redirectReducer
});

export default combinedReducer;