import { ProfileState } from './profileSlice'

export const selectProfileUsername = (state: { auth: ProfileState }) =>
  state.auth.username

export const selectProfileNickname = (state: { auth: ProfileState }) =>
  state.auth.nickname

export const selectProfileLoading = (state: { auth: ProfileState }) =>
  state.auth.loading
