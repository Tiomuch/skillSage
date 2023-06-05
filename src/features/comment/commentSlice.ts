import { createSlice } from '@reduxjs/toolkit'
import { logout } from '../auth/authSlice'

export type Comment = {
  id: number
  text: string
  user_id: number
  post_id: number
  created_at: string
  likes_count: string
  dislikes_count: string
  liked: boolean | null
  user: {
    id: number
    username: string
    nickname: string
  }
}

export type CommentState = {
  loading: boolean
  error: any
  comments: Array<Comment>
  total: number
  text: {
    value: string | null
    isValid: boolean
  }
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
  total: 0,
  text: {
    value: null,
    isValid: false,
  },
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setCommentText: (state, { payload }) => {
      state.text.value = payload
      state.text.isValid = payload.trim().length > 0
    },
    createCommentRequest: state => {
      state.loading = true
    },
    createCommentSuccess: state => {
      state.loading = false
      state.error = null
    },
    createCommentFailure: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    getCommentsRequest: state => {
      state.loading = true
    },
    getCommentsSuccess: (state, { payload }) => {
      state.loading = false
      state.error = null
      state.comments = payload.data
      state.total = payload.total
    },
    getCommentsFailure: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    deleteCommentRequest: state => {
      state.loading = true
    },
    deleteCommentSuccess: state => {
      state.loading = false
      state.error = null
    },
    deleteCommentFailure: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    clearCommentCreateFields: state => {
      state.loading = initialState.loading
      state.error = initialState.error
      state.text = initialState.text
    },
    clearCommentFields: state => {
      state.loading = initialState.loading
      state.error = initialState.error
      state.comments = initialState.comments
      state.total = initialState.total
    },
  },
  extraReducers: builder => {
    builder.addCase(logout, state => {
      state.loading = initialState.loading
      state.error = initialState.error
      state.comments = initialState.comments
      state.total = initialState.total
    })
  },
})

export const {
  clearCommentFields,
  createCommentRequest,
  createCommentSuccess,
  createCommentFailure,
  getCommentsRequest,
  getCommentsSuccess,
  getCommentsFailure,
  deleteCommentRequest,
  deleteCommentSuccess,
  deleteCommentFailure,
  setCommentText,
  clearCommentCreateFields,
} = commentSlice.actions

export default commentSlice.reducer
