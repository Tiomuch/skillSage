import { ProfileState } from './profileSlice'

export const selectProfileUsername = (state: { profile: ProfileState }) =>
  state.profile.username

export const selectProfileNickname = (state: { profile: ProfileState }) =>
  state.profile.nickname

export const selectProfileLoading = (state: { profile: ProfileState }) =>
  state.profile.loading
