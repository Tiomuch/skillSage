import { CommentState } from './commentSlice'

export const selectCommentText = (state: { comment: CommentState }) =>
  state.comment.text

export const selectComments = (state: { comment: CommentState }) =>
  state.comment.comments

export const selectCommentLoading = (state: { comment: CommentState }) =>
  state.comment.loading

export const selectCommentTotal = (state: { comment: CommentState }) =>
  state.comment.total
