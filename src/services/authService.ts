import baseServiceMethods from './baseServiceMethods'

const authService = {
  loginApi: (data: { username: string; password: string }) => {
    return baseServiceMethods.post(`/auth/login`, data)
  },
  registerApi: (data: {
    username: string
    password: string
    secretWord: string
  }) => {
    return baseServiceMethods.post(`/auth/register`, {
      ...data,
      secret_word: data.secretWord,
    })
  },
  restorePasswordApi: (data: {
    username: string
    password: string
    secretWord: string
  }) => {
    return baseServiceMethods.post(`/auth/password-reset`, {
      ...data,
      secret_word: data.secretWord,
    })
  },
}

export default authService
