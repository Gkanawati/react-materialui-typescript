import axios from "axios";

import { Environment } from "./../../../environment/index";
import { errorInterceptor } from "./interceptors/ErrorInterceptor";
import { responseInterceptor } from "./interceptors/ResponseInterceptor";

const Api = axios.create({
    baseURL: Environment.URL_BASE
});

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
);

export {Api};