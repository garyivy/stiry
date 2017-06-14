import axios from 'axios';
import { apiStarted, apiFinished } from './apiStatusActionCreators.js';
import { signout } from './authenticationActionCreators.js';

const apiPath = 'api/';

export const createApiCall = (method, url, shouldIncludeAuthorizationHeader = true) => {
    return (dispatch, data = null) => {
        dispatch(apiStarted());

        let headers = { 'Content-type': 'application/json' };
        if(shouldIncludeAuthorizationHeader) {
            headers.authorization = localStorage.getItem('sessionToken');
        }

        let config = {
            url: apiPath + (method === 'get' && data ? url + '/' + data : url),
            method: method,
            data: method === 'get' ? null : data,
            headers: headers,
            validateStatus: () => true
        }

        const promise = new Promise((resolve, reject) => {
            axios(config).then((response) => {
                dispatch(apiFinished());

                if(shouldIncludeAuthorizationHeader && response.status == 401) {
                    dispatch(signout());
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
                dispatch(apiFinished());

                console.error(error);
                resolve({ error: 'Unable to process request at this time.'});
            });
        });

        return promise;
    }
}

