import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer.js';
import collaborationReducer from './collaborationReducer.js';
import redirectReducer from './redirectReducer.js';
import apiStatusReducer from './apiStatusReducer.js';
import windowSizeReducer from './windowSizeReducer.js';

import { reducer as formReducer } from 'redux-form';

const locationReducer = (location = null, action) => {
     console.log(action);

    switch (action.type) {
        case '@@router/LOCATION_CHANGE':
            console.log(action);

        default:
            return location;
    }
}

const combinedReducer = combineReducers({
    authentication: authenticationReducer, 
    collaboration:  collaborationReducer,
    redirectUrl:    redirectReducer,
    apiStatus:      apiStatusReducer,
    windowSize:     windowSizeReducer,
    location:       locationReducer,
    form:           formReducer // TODO: Remove if not using redux-form (still weighing pros/cons)
});

export default combinedReducer;