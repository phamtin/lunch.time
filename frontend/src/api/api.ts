import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

import { getToken } from '@app/utils/common/storage';

import { trimValue, toCamelCase } from '../utils/helpers/transform';

const authInterceptor = (request: AxiosRequestConfig) => {
  const requestConfig = trimValue(request);
  requestConfig.params = toCamelCase(requestConfig.params);
  requestConfig.data = toCamelCase(requestConfig.data);

  const accessToken = getToken();

  if (accessToken) {
    requestConfig.headers.AuthorizationI = `API ${accessToken}`;
  }

  return requestConfig;
};

export const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
});

const responseInterceptor = (response: AxiosResponse) => {
  response.data = toCamelCase(response.data);
  return response;
};

const errorInterceptor = async (errorAxios: AxiosError) => {
  if (errorAxios?.response) {
    const statusCode = errorAxios.response.status;
    switch (statusCode) {
      case 401:
        // await logout();
        window.location.replace('/');
        break;
      case 403:
        window.location.replace('/');
        break;
      default:
    }
  }
  return Promise.reject(errorAxios);
};

/** Add interceptor */
api.interceptors.request.use(authInterceptor);
api.interceptors.response.use(responseInterceptor, errorInterceptor);
