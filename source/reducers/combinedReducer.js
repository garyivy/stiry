import { combineReducers } from 'redux';
import userReducer from './userReducer.js';
import collaborationReducer from './collaborationReducer.js';
import redirectReducer from './redirectReducer.js';
import apiStatusReducer from './apiStatusReducer.js';
import { reducer as formReducer } from 'redux-form';

const combinedReducer = combineReducers({
    user:           userReducer, 
    collaboration:  collaborationReducer,
    redirectUrl:    redirectReducer,
    apiStatus:      apiStatusReducer,
    form:           formReducer // TODO: Remove if not using redux-form (still weighing pros/cons)
});

export default combinedReducer;