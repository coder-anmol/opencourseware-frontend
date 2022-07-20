import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

function getAuthToken() {
    if (typeof window !== "undefined") {
        const user = JSON.parse(window.localStorage.getItem("user"));

        if (user) {
            const token = user.access;

            const headers = {
                Authorization: `Bearer ${token}`,
            };
            return headers;
        } else {
            return {};
        }
    }
    return {};
}

const Axios = axios.create({
    baseURL: publicRuntimeConfig.BACKEND_API,
});

Axios.interceptors.request.use((config) => {
    config.headers = {
        Accept: "application/json",
        ...getAuthToken(),
    };
    return config;
});

export default Axios;
