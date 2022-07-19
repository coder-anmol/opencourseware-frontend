import axios from "axios";

const Axios = axios.create({
    baseURL: process.env.BACKEND_API,
});

export default Axios;
