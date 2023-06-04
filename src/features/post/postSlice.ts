import { createSlice } from '@reduxjs/toolkit'
import { logout } from '../auth/authSlice'

export type Post = {
  id: number
  user_id: number
  category_id: number
  title: string
  description: string
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

export type PostState = {
  search: string
  loading: boolean
  error: any
  posts: Array<Post>
  total: number
  categoryId: number | null
}

const initialState: PostState = {
  search: '',
  posts: [],
  loading: false,
  error: null,
  total: 0,
  categoryId: null,
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostSearch: (state, { payload }) => {
      state.search = payload
    },
    setPostCategoryId: (state, { payload }) => {
      state.categoryId = payload
    },
    searchPostRequest: state => {
      state.loading = true
    },
    searchPostSuccess: (state, { payload }) => {
      state.loading = false
      state.error = null
      state.posts = payload.data
      state.total = payload.total
    },
    searchPostFailure: (state, { payload }) => {
      state.loading = false
      state.error = payload
      state.posts = initialState.posts
      state.total = initialState.total
    },
    clearPostFields: state => {
      state.search = initialState.search
      state.loading = initialState.loading
      state.error = initialState.error
      state.posts = initialState.posts
      state.total = initialState.total
      state.categoryId = initialState.categoryId
    },
  },
  extraReducers: builder => {
    builder.addCase(logout, state => {
      state.search = initialState.search
      state.loading = initialState.loading
      state.error = initialState.error
      state.posts = initialState.posts
      state.total = initialState.total
      state.categoryId = initialState.categoryId
    })
  },
})

export const {
  setPostSearch,
  clearPostFields,
  searchPostRequest,
  searchPostSuccess,
  searchPostFailure,
  setPostCategoryId,
} = postSlice.actions

export default postSlice.reducer
