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
  title: {
    value: string | null
    isValid: boolean
  }
  description: {
    value: string | null
    isValid: boolean
  }
  post: Post | null
  postId: number | null
}

const initialState: PostState = {
  search: '',
  posts: [],
  loading: false,
  error: null,
  total: 0,
  categoryId: null,
  title: {
    value: null,
    isValid: false,
  },
  description: {
    value: null,
    isValid: false,
  },
  post: null,
  postId: null,
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostSearch: (state, { payload }) => {
      state.search = payload
    },
    setPostId: (state, { payload }) => {
      state.postId = payload
    },
    setPostCategoryId: (state, { payload }) => {
      state.categoryId = payload
    },
    setPostTitle: (state, { payload }) => {
      state.title.value = payload
      state.title.isValid = payload.trim().length > 0
    },
    setPostDescription: (state, { payload }) => {
      state.description.value = payload
      state.description.isValid = payload.trim().length > 0
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
    createPostRequest: state => {
      state.loading = true
    },
    createPostSuccess: state => {
      state.loading = false
      state.error = null
    },
    createPostFailure: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    getPostByIdRequest: state => {
      state.loading = true
    },
    getPostByIdSuccess: (state, { payload }) => {
      state.loading = false
      state.error = null
      state.post = payload
    },
    getPostByIdFailure: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    deletePostRequest: state => {
      state.loading = true
    },
    deletePostSuccess: state => {
      state.loading = false
      state.error = null
    },
    deletePostFailure: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    clearPostCreateFields: state => {
      state.title = initialState.title
      state.description = initialState.description
      state.loading = initialState.loading
      state.error = initialState.error
    },
    clearPostDetailsFields: state => {
      state.post = initialState.post
      state.postId = initialState.postId
      state.loading = initialState.loading
      state.error = initialState.error
    },
    clearPostFields: state => {
      state.search = initialState.search
      state.loading = initialState.loading
      state.error = initialState.error
      state.posts = initialState.posts
      state.total = initialState.total
      state.categoryId = initialState.categoryId
      state.title = initialState.title
      state.description = initialState.description
      state.post = initialState.post
      state.postId = initialState.postId
    },
    clearMyPostsFields: state => {
      state.search = initialState.search
      state.loading = initialState.loading
      state.error = initialState.error
      state.posts = initialState.posts
      state.total = initialState.total
      state.title = initialState.title
      state.description = initialState.description
      state.post = initialState.post
      state.postId = initialState.postId
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
      state.title = initialState.title
      state.description = initialState.description
      state.post = initialState.post
      state.postId = initialState.postId
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
  setPostTitle,
  setPostDescription,
  clearPostCreateFields,
  createPostRequest,
  createPostSuccess,
  createPostFailure,
  getPostByIdRequest,
  getPostByIdSuccess,
  getPostByIdFailure,
  setPostId,
  clearPostDetailsFields,
  deletePostRequest,
  deletePostSuccess,
  deletePostFailure,
  clearMyPostsFields,
} = postSlice.actions

export default postSlice.reducer
