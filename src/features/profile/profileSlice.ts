import { createSlice } from '@reduxjs/toolkit'

export type ProfileState = {
  username: {
    value: string | null
    isValid: boolean
  }
  nickname: {
    value: string | null
    isValid: boolean
  }
  loading: boolean
  error: any
}

const initialState: ProfileState = {
  username: { value: null, isValid: false },
  nickname: { value: null, isValid: false },
  loading: false,
  error: null,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileUsername: (state, { payload }) => {
      state.username.value = payload.trim()
      state.username.isValid = payload.trim().length > 4
    },
    setProfileNickname: (state, { payload }) => {
      state.nickname.value = payload.trim()
      state.nickname.isValid = payload.trim().length > 4
    },
    updateUserRequest: state => {
      state.loading = true
    },
    updateUserSuccess: state => {
      state.loading = false
      state.error = null
    },
    updateUserFailure: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    clearProfileFields: state => {
      state.username = initialState.username
      state.nickname = initialState.nickname
      state.loading = initialState.loading
      state.error = initialState.error
    },
  },
})

export const {
  setProfileUsername,
  setProfileNickname,
  clearProfileFields,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
} = profileSlice.actions

export default profileSlice.reducer
