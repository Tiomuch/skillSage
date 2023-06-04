import baseServiceMethods from './baseServiceMethods'

const postService = {
  searchPostApi: (
    token: string,
    title: string,
    categoryId: number,
    limit = 10,
  ) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    return baseServiceMethods.get(
      `/posts/?limit=${limit}&title=${title}&category_id=${categoryId}`,
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
}

export default postService
