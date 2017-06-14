import * as actionTypes from './actionTypes.js';
import { requestRedirect } from './syncActionCreators.js';
import axios from 'axios';

const apiPath = 'api/';

export const apiCallCreator = (method, url, shouldIncludeAuthoriationHeader = true) => {
    return (dispatch, data = null) => {
        dispatch({ type: actionTypes.API_CALL_STARTED });

        let headers = { 'Content-type': 'application/json' };
        if(shouldIncludeAuthoriationHeader) {
            headers.authorization = localStorage.getItem('sessionToken');
        }

        let config = {
            url: apiPath + (method === 'get' && data ? url + '/' + data : url),
            method: method,
            data: method === 'get' ? null : data,
            headers: headers,
            validateStatus: () => true
        }

        console.log(config);

        const promise = new Promise((resolve, reject) => {
            axios(config).then((response) => {
                dispatch({ type: actionTypes.API_CALL_FINISHED });

                if(shouldIncludeAuthoriationHeader && response.status == 401) {
                    dispatch({ type: actionTypes.SIGNOUT});
                    dispatch(requestRedirect('/'));
                    resolve({});
                    return;
                }

                if(response.status == 401) {
                    resolve({ payload: null, error: 'Invalid credentials.'});
                    return;
                }

                if(response.status == 200) {
                    // TODO: Ensure the express server replaces a soon-to-be stale sessionToken
                    response.data 
                        && response.data.sessionToken 
                        && response.data.sessionToken
                        && localStorage.setItem('sessionToken', response.data.sessionToken);
                    
                    resolve({ payload: response.data.payload || response.data }); // TODO: Decide on uniform response structure
                    return;
                }

                resolve({ error: 'Unable to process request at this time.'});
            }).catch((error) => {
                dispatch({ type: actionTypes.API_CALL_FINISHED });

                console.error(error);
                resolve({ error: 'Unable to process request at this time.'});
            });
        });

        return promise;
    }
}

