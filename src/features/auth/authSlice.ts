import { createSlice } from '@reduxjs/toolkit'

import { passwordRegex } from '../../constants/validation'

export type User = {
  username: string
  nickname: string | null
  password: string
  refresh_token: string
  secret_word: string
  id: number
  created_at: string
}

export type AuthState = {
  username: {
    value: string | null
    isValid: boolean
  }
  password: {
    value: string | null
    isValid: boolean
  }
  secretWord: {
    value: string | null
    isValid: boolean
  }
  loading: boolean
  error: any
  user: User | null
  accessToken: string | null
}

const initialState: AuthState = {
  username: { value: null, isValid: false },
  password: { value: null, isValid: false },
  secretWord: { value: null, isValid: false },
  loading: false,
  error: null,
  user: null,
  accessToken: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername: (state, { payload }) => {
      state.username.value = payload.trim()
      state.username.isValid = payload.trim().length > 4
    },
    setPassword: (state, { payload }) => {
      state.password.value = payload.trim()
      state.password.isValid = passwordRegex.test(payload.trim())
    },
    setSecretWord: (state, { payload }) => {
      state.secretWord.value = payload.trim()
      state.secretWord.isValid = payload.trim().length > 4
    },
    loginRequest: state => {
      state.loading = true
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false
      state.user = payload.data
      state.accessToken = payload.accessToken
      state.error = null
    },
    loginFailure: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    registerRequest: state => {
      state.loading = true
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false
      state.user = payload.data
      state.accessToken = payload.accessToken
      state.error = null
    },
    registerFailure: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    restorePasswordRequest: state => {
      state.loading = true
    },
    restorePasswordSuccess: state => {
      state.loading = false
      state.error = null
    },
    restorePasswordFailure: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    refreshTokenRequest: state => {
      state.loading = true
    },
    refreshTokenSuccess: (state, { payload }) => {
      state.loading = false
      state.accessToken = payload.accessToken
      state.user = {
        ...(state.user as User),
        refresh_token: payload.refreshToken,
      }
    },
    refreshTokenFailure: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    clearAuthFields: state => {
      state.username = initialState.username
      state.password = initialState.password
      state.secretWord = initialState.secretWord
      state.loading = initialState.loading
      state.error = initialState.error
    },
    logout: state => {
      state.username = initialState.username
      state.password = initialState.password
      state.secretWord = initialState.secretWord
      state.loading = initialState.loading
      state.error = initialState.error
      state.user = initialState.user
      state.accessToken = initialState.accessToken
    },
  },
})

export const {
  setUsername,
  setPassword,
  setSecretWord,
  clearAuthFields,
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  restorePasswordRequest,
  restorePasswordSuccess,
  restorePasswordFailure,
  refreshTokenRequest,
  refreshTokenSuccess,
  refreshTokenFailure,
  logout,
} = authSlice.actions

export default authSlice.reducer
