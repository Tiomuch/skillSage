import baseServiceMethods from './baseServiceMethods'

const commentService = {
  getCommentsApi: (token: string, postId: string, limit = 10) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    return baseServiceMethods.get(
      `/comments/?limit=${limit}&post_id=${postId}`,
      headers,
    )
  },
  createCommentApi: (
    token: string,
    data: { text: string; post_id: number },
  ) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    return baseServiceMethods.post(`/comments`, data, headers)
  },
  deleteCommentApi: (token: string, commentId: number) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    return baseServiceMethods.delete(`/comments/${commentId}`, headers)
  },
}

export default commentService
