import { combineReducers } from 'redux';
import userReducer from './userReducer.js';
import questionnaireReducer from './questionnaireReducer.js';

const combinedReducer = combineReducers({
    user: userReducer, 
    questionnaire: questionnaireReducer
});

export default combinedReducer;