import axios, { AxiosResponse } from "axios";

const authRequests = {
  signup: (body: any): Promise<AxiosResponse<any>> => {
    return axios.post(`/auth/register`, body);
  },
  login: (body: any): Promise<AxiosResponse<any>> => {
    return axios.post(`/auth/login`, body);
  },
  refreshToken: (body: any): Promise<AxiosResponse<any>> => {
    return axios.post(`/auth/refresh_token`, body);
  },
  logout: (): void => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
  forgot: (body: any): Promise<AxiosResponse<any>> => {
    return axios.post(`/auth/forgot`, body);
  },
  reset: (body: any): Promise<AxiosResponse<any>> => {
    return axios.post(`/auth/reset`, body);
  },
  getProtected: (): Promise<AxiosResponse<any>> => {
    return axios.get(`/protected_resource`);
  },
  getUser: (): Promise<AxiosResponse<any>> => {
    return axios.get(`/auth/user`);
  },
  getTransactions: (userid: any): Promise<AxiosResponse<any>> => {
    return axios.get(`/transactions/${userid}`);
  },
  createTransaction: (): Promise<AxiosResponse<any>> => {
    return axios.post(`/transactions`);
  },
};

export default authRequests;
