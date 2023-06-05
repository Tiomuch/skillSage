import baseServiceMethods from './baseServiceMethods'

const postService = {
  searchPostApi: (
    token: string,
    title: string,
    categoryId: number | string = '',
    userId: number | string = '',
    limit = 10,
  ) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    return baseServiceMethods.get(
      `/posts/?limit=${limit}&title=${title}&category_id=${categoryId}&user_id=${userId}`,
      headers,
    )
  },
  createPostApi: (
    token: string,
    data: { title: string; description: string; category_id: number },
  ) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    return baseServiceMethods.post(`/posts`, data, headers)
  },
  getPostByIdApi: (token: string, postId: number) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    return baseServiceMethods.get(`/posts/${postId}`, headers)
  },
  deletePostApi: (token: string, postId: number) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    return baseServiceMethods.delete(`/posts/${postId}`, headers)
  },
}

export default postService
