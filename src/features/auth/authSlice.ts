import { createSlice } from '@reduxjs/toolkit'

import { passwordRegex } from '../../constants/validation'

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
}

const initialState: AuthState = {
  username: { value: null, isValid: false },
  password: { value: null, isValid: false },
  secretWord: { value: null, isValid: false },
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
    clearAuthFields: state => {
      state.username = initialState.username
      state.password = initialState.password
      state.secretWord = initialState.secretWord
    },
  },
})

export const { setUsername, setPassword, setSecretWord, clearAuthFields } =
  authSlice.actions

export default authSlice.reducer
