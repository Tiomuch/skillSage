import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { refreshTokenRequest, logout } from '../features/auth/authSlice'
import { store } from '../store'

const baseService = axios.create({
  baseURL: 'https://skill-sage-api.vercel.app/api',
})

let isRefreshingToken = false
let failedRequestsQueue: any = []

const addToQueue = (error: any, originalRequest: AxiosRequestConfig) => {
  return new Promise((resolve, reject) => {
    failedRequestsQueue.push({ error, originalRequest, resolve, reject })
  })
}

const processQueue = () => {
  failedRequestsQueue.forEach(async (item: any) => {
    const { error, originalRequest, resolve, reject } = item

    if (error) {
      reject(error)
    } else {
      try {
        const newRequestConfig = {
          ...originalRequest,
          headers: {
            ...originalRequest.headers,
            Authorization: `Bearer ${store.getState().auth.accessToken}`,
          },
        }

        const response = await baseService.request(newRequestConfig)
        resolve(response)
      } catch (requestError) {
        reject(requestError)
      }
    }
  })

  failedRequestsQueue = []
}

baseService.interceptors.response.use(
  (response: AxiosResponse) => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshingToken) {
        return addToQueue(error, originalRequest)
          .then(() => {
            return baseService.request(originalRequest)
          })
          .catch(promiseError => {
            return Promise.reject(promiseError)
          })
      }

      originalRequest._retry = true

      isRefreshingToken = true

      try {
        await store.dispatch(refreshTokenRequest())

        // If the token refresh was successful, we resend the original request
        const newRequestConfig = {
          ...originalRequest,
          headers: {
            ...originalRequest.headers,
            Authorization: `Bearer ${store.getState().auth.accessToken}`,
          },
        }
        const response = await baseService.request(newRequestConfig)

        // Successfully completed request - resend all requests from the queue
        processQueue()

        return response
      } catch (refreshError) {
        // If the token refresh fails, we log out and reject all requests from the queue
        await store.dispatch(logout())
        processQueue()

        return Promise.reject(refreshError)
      } finally {
        isRefreshingToken = false
      }
    }

    return Promise.reject(error)
  },
)

interface RequestData {
  [key: string]: any
}

interface ResponseData {
  [key: string]: any
}

type ResponseHandler<T> = (response: AxiosResponse<ResponseData>) => T

const request = async <T>(
  method: string,
  url: string,
  data?: RequestData,
  headers?: AxiosRequestConfig['headers'],
  responseHandler?: ResponseHandler<T>,
): Promise<T> => {
  const baseMessage = `${method} ⟴ Axios ⟴ URL: ${url}`

  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      headers,
    }

    const response = await baseService.request<ResponseData>(config)

    if (responseHandler) {
      return responseHandler(response)
    }

    console.log(`${response.status} ${baseMessage}`, response)

    return response.data as T
  } catch (error: any) {
    console.log(
      `${error?.response?.status || 'UNAVAILABLE'} ${baseMessage}`,
      error?.response || error,
    )

    throw error
  }
}

const baseServiceMethods = {
  get: <T>(
    url: string,
    headers?: AxiosRequestConfig['headers'],
    responseHandler?: ResponseHandler<T>,
  ): Promise<T> => request<T>('get', url, undefined, headers, responseHandler),

  post: <T>(
    url: string,
    data?: RequestData,
    headers?: AxiosRequestConfig['headers'],
    responseHandler?: ResponseHandler<T>,
  ): Promise<T> => request<T>('post', url, data, headers, responseHandler),

  put: <T>(
    url: string,
    data?: RequestData,
    headers?: AxiosRequestConfig['headers'],
    responseHandler?: ResponseHandler<T>,
  ): Promise<T> => request<T>('put', url, data, headers, responseHandler),

  delete: <T>(
    url: string,
    headers?: AxiosRequestConfig['headers'],
    responseHandler?: ResponseHandler<T>,
  ): Promise<T> =>
    request<T>('delete', url, undefined, headers, responseHandler),
}

export default baseServiceMethods
