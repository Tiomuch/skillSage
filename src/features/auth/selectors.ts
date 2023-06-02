import { AuthState } from './authSlice'

export const selectAuthUsername = (state: { auth: AuthState }) =>
  state.auth.username

export const selectAuthPassword = (state: { auth: AuthState }) =>
  state.auth.password

export const selectAuthSecretWord = (state: { auth: AuthState }) =>
  state.auth.secretWord

export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.loading

export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user

export const selectAuthAccessToken = (state: { auth: AuthState }) =>
  state.auth.accessToken
