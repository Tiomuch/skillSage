import { PostState } from './postSlice'

export const selectPostSearch = (state: { post: PostState }) =>
  state.post.search

export const selectPostPosts = (state: { post: PostState }) => state.post.posts

export const selectPostLoading = (state: { post: PostState }) =>
  state.post.loading

export const selectPostTotal = (state: { post: PostState }) => state.post.total

export const selectPostCategoryId = (state: { post: PostState }) =>
  state.post.categoryId

export const selectPostTitle = (state: { post: PostState }) => state.post.title

export const selectPostDescription = (state: { post: PostState }) =>
  state.post.description
