import { createSlice } from '@reduxjs/toolkit'

import { passwordRegex } from '../../constants/validation'

export type User = any

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
  refreshToken: string | null
}

const initialState: AuthState = {
  username: { value: null, isValid: false },
  password: { value: null, isValid: false },
  secretWord: { value: null, isValid: false },
  loading: false,
  error: null,
  user: null,
  refreshToken: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername: (state, { payload }) => {
      state.username.value = payload
      state.username.isValid = payload.trim().length > 4
    },
    setPassword: (state, { payload }) => {
      state.password.value = payload
      state.password.isValid = passwordRegex.test(payload.trim())
    },
    setSecretWord: (state, { payload }) => {
      state.secretWord.value = payload
      state.secretWord.isValid = payload.trim().length > 4
    },
    loginRequest: state => {
      state.loading = true
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false
      state.user = payload.user
      state.refreshToken = payload.refreshToken
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
      state.user = payload.user
      state.refreshToken = payload.refreshToken
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
    clearAuthFields: state => {
      state.username = initialState.username
      state.password = initialState.password
      state.secretWord = initialState.secretWord
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
} = authSlice.actions

export default authSlice.reducer
