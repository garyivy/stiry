import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer.js';
import collaborationReducer from './collaborationReducer.js';
import redirectReducer from './redirectReducer.js';
import apiStatusReducer from './apiStatusReducer.js';
import windowSizeReducer from './windowSizeReducer.js';

import { reducer as formReducer } from 'redux-form';

const loggerReducer = (state = {}, action) => {
    console.log(action);
    return state;
}

const combinedReducer = combineReducers({
    authentication: authenticationReducer, 
    collaboration:  collaborationReducer,
    redirectUrl:    redirectReducer,
    apiStatus:      apiStatusReducer,
    windowSize:     windowSizeReducer,
    logger:         loggerReducer,
    form:           formReducer // TODO: Remove if not using redux-form (still weighing pros/cons)
});

export default combinedReducer;