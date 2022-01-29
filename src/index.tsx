import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;

// request interceptor to add the auth token header to requests
axios.interceptors.request.use((config: AxiosRequestConfig<any>): AxiosRequestConfig => {
  const accessToken = localStorage.getItem("accessToken");
  if (!config) {
    config = {};
  }
  if (!config.headers) {
    config.headers = {};
  }
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
},
  (error): void => {
    Promise.reject(error);
  }
);

// response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
  (response): AxiosResponse<any> => {
    return response;
  },
  (error): Promise<AxiosResponse<any> | undefined> => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refreshToken");

    if (
      refreshToken &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios
        .post(`/auth/refresh_token`, { refreshToken })
        .then((res): AxiosPromise<any> | undefined => {
          if (res.status === 200) {
            localStorage.setItem("accessToken", res.data.accessToken);
            console.log("Access token refreshed!");
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
