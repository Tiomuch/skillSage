import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const baseService = axios.create({
  baseURL: 'https://skill-sage-api.vercel.app/api',
})

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
}

export default baseServiceMethods