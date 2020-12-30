import axios, {AxiosError, AxiosResponse, Method} from 'axios';

import {CustomError} from './error';
import Server from '../config/server';

const request = axios.create({
    baseURL: Server.baseUrl,
});

request.interceptors.request.use((req) => {
  return req;
});

request.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return response;
  },
  (error: AxiosError<{message: string}>) => {
    const httpErrorCode = error.response ? error.response.status : 0;
    const statusText = error.response ? error.response.statusText : '';
    const responseData = error.response ? error.response.data : '';

    const errorMessage = responseData && responseData.message ? responseData.message : `${statusText}, failed to call ${error.config.url}`;
    throw new CustomError(httpErrorCode.toString(), errorMessage, responseData);
  }
);

export default function ajax<T>(method: Method, url: string, params: {[key: string]: any} = {}, data: {[key: string]: any} = {}): Promise<T> {
  url = url.replace(/:\w+/g, (flag) => {
    const key = flag.substr(1);
    if (params[key]) {
      const val: string = params[key];
      delete params[key];
      return encodeURIComponent(val);
    }
    return '';
  });

  return request.request({method, url, params, data}).then((response) => response.data);
}
