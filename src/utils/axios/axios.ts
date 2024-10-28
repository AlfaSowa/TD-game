import axios from 'axios'
import {
  requestInterceptor,
  requestInterceptorError,
  responseInterceptor,
  responseInterceptorError
} from './interceptors'

export const axiosApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`
})

axiosApi.interceptors.request.use(requestInterceptor, requestInterceptorError)
axiosApi.interceptors.response.use(responseInterceptor, responseInterceptorError)
