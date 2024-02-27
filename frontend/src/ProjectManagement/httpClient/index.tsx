import axios from "axios";
import { NETWORK_CALL_TIMEOUT } from "../utils";

const httpClient = axios.create({
    timeout: NETWORK_CALL_TIMEOUT,
});

// Add a response interceptor to handle 401 errors globally
httpClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // If the error response status is 401 (Unauthorized)
        if (error.response && error.response.status === 401) {
            // Redirect to the login page
            localStorage.clear();
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default httpClient;
