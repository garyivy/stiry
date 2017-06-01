import axios from 'axios';

const apiPath = 'api/';

const showBusyThreshold = 300;
const showBusy = () =>      document.documentElement.style.cursor = 'progress';
const showNormal = () =>    document.documentElement.style.cursor = 'auto';

// TODO: Refactor common stuff

export const get = (url) => {
    let isComplete = false;
    setTimeout(() => {
        !isComplete && showBusy();
    }, showBusyThreshold);

    return axios
        .get(apiPath + url, { 'Content-Type': 'application/json', headers: {'authorization': localStorage.getItem("sessionToken") }})
        .then((response) => { isComplete == true; showNormal(); return response.data })
        .catch((error) => { isComplete == true; showNormal(); console.error(error); });
}

export const post = (url, data) => {
    let isComplete = false;
    setTimeout(() => {
        !isComplete && showBusy();
    }, showBusyThreshold);

    return axios
        .post(apiPath + url, data, { headers: {'authorization': localStorage.getItem("sessionToken") }})
        .then((response) => { isComplete == true; showNormal(); return response.data })
        .catch((error) => { isComplete == true; showNormal(); console.error(error); });
}

export const put = (url, data) => {
    let isComplete = false;
    setTimeout(() => {
        !isComplete && showBusy();
    }, showBusyThreshold);

    return axios
        .put(apiPath + url, data)
        .then((response) => { isComplete == true; showNormal(); return response.data })
        .catch((error) => { isComplete == true; showNormal(); console.error(error); });
}


