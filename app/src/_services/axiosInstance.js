import axios from "axios";
import {urlConstants} from "@/_constants/urlConstants";

/* Axios object options */
const baseURL = urlConstants.api_base_url;
let axiosOptions = {
    baseURL,
    headers: {}
}
const AxiosAPI = axios.create(axiosOptions);

/* @interceptors to commonAPI object */
AxiosAPI.interceptors.response.use(
    response => {
        return response
    },
    error => {
        const status = error.response ? error.response.status : null;
        console.log('statusCode', status);
        switch (status) {
            case 404:
                console.log("Not Found", error);
                break;
            case 401:
                console.log("Unauthorized Request", error);
                break;
            case 440:
                alert('Session Expired Logging Out !');
                // store.dispatch(clearUserData());
                localStorage.removeItem("persist:root");
                window.location.replace(urlConstants.login_page);
                break;
            default:
                break;
        }
        return Promise.resolve(error.response);
    }
);

AxiosAPI.interceptors.request.use(async function (config) {
    /* Loading Token from state */
    let token = "no authentication"; // store.getState()?.user?.userData?.authToken;
    /* If Token Not Found Load it from localStorage */
    if (!token) {
        let localState = localStorage.getItem('persist:root');
        if (localState) {
            localState = JSON.parse(JSON.parse(localState)?.user || '')?.authToken;
            token = localState;
        }
    }
    if (token) config.headers.Authorization = token;
    return config;
});

export default AxiosAPI;