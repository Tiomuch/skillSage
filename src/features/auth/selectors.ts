import { AuthState } from './authSlice'

export const selectUsername = (state: { auth: AuthState }) =>
  state.auth.username

export const selectPassword = (state: { auth: AuthState }) =>
  state.auth.password

export const selectSecretWord = (state: { auth: AuthState }) =>
  state.auth.secretWord

export const selectLoading = (state: { auth: AuthState }) => state.auth.loading
