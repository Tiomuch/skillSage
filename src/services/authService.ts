import baseServiceMethods from './baseServiceMethods'

const authService = {
  loginApi: (data: { username: string; password: string }) => {
    return baseServiceMethods.post(`/auth/login`, data)
  },
  registerApi: (data: {
    username: string
    password: string
    secret_word: string
  }) => {
    return baseServiceMethods.post(`/auth/register`, data)
  },
  restorePasswordApi: (data: {
    username: string
    password: string
    secret_word: string
  }) => {
    return baseServiceMethods.post(`/auth/password-reset`, data)
  },
}

export default authService
